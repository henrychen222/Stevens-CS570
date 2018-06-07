
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

/**
 
 * Router class.
 */
public class Router {
    private String id;
    private String networkName;
    private boolean on;
    private Map<String, Integer> connections_map;
    private Map<String, Integer> tickCounter_map;
    private Map<String, String> routing_Table;
    private Map<String, Map<String, Integer>> privateNetwork_map;
    private int sequenceNumber;
    private Map<String, Integer> sequenceNumberMap;

    public Router(String id, String networkName, Map<String, Integer> connections) {
        on = true;
        this.id = id;
        this.networkName = networkName;
        sequenceNumber = 0;
        this.connections_map = connections;
        tickCounter_map = new TreeMap<String, Integer>();
        privateNetwork_map = new HashMap<String, Map<String, Integer>>();
        // init private network and tick counter.
        for (String routerId : connections.keySet()) {
            // init tickCounter, all set 0;
            tickCounter_map.put(routerId, 0);
            // init the cost from the reverse way.
            if (routerId.equals(id)) continue;
            Map<String, Integer> networkCost = new HashMap<String, Integer>();
            networkCost.put(id, connections.get(routerId));
            privateNetwork_map.put(routerId, networkCost);
        }
        privateNetwork_map.put(id, connections);
        sequenceNumberMap = new TreeMap<>();
    }
    public boolean getState(){
    	return this.on;
    }
    /*
     * return networkname
     */
    public String getNetworkName() {
        return this.networkName;
    }
	/*
	 * return router ID
	 */
    public String getId() {
        return this.id;
    }
    /*
     * return routing Table
     */
    public Map<String, String> getRoutingTable() {
        return this.routing_Table;
    }
    public Map<String, Integer> getConnections_map(){
    	return this.connections_map;
    }
    public Map<String, Integer> getTickCounter_map(){
    	return this.tickCounter_map;
    }
    public Map<String, Map<String, Integer>> getPrivateNetwork_map(){
    	return this.privateNetwork_map;
    }
    /*
     * shut down set to false
     */
    public void shutDown() {
        this.on = false;
    }
    /*
     * start up  set to true
     */
    public void startUp() {
    	this.on = true;
        for (String router : this.getTickCounter_map().keySet())
            tickCounter_map.put(router, 0);
    }

    public void addInConnection(String key, Integer value){
    	this.connections_map.put(key, value);
    }
    public LinkPackage receivePacket(LinkPackage linkStatePackage, String forwardRouterId) {
        // if closed return null;
        if (!on||linkStatePackage.getOriginate().equals(id)) return null;
        tickCounter_map.put(linkStatePackage.getOriginate(), 0);
        int sn = linkStatePackage.getSequenceNumber();
        if (sequenceNumberMap.get(linkStatePackage.getOriginate()) != null && sequenceNumberMap.get(linkStatePackage.getOriginate()) >= sn)
            return null;
        // reduce ttl;
        linkStatePackage.visit();
        sequenceNumberMap.put(linkStatePackage.getOriginate(), sn);
        // update the routing graph of the router.
        Map<String, Map<String, Integer>> network = linkStatePackage.getPrivateNetwork();
        for (String router_str : network.keySet()) {
            if (privateNetwork_map.containsKey(router_str)) {
                Map<String, Integer> costs = privateNetwork_map.get(router_str);
                costs.put(router_str, 0);
                privateNetwork_map.put(router_str, costs);
            } else {
                Map<String, Integer> costs = new HashMap<>();
                costs.put(router_str, 0);
                privateNetwork_map.put(router_str, costs);
            }
            for (String routerB : network.get(router_str).keySet()) {
                Map<String, Integer> costs;
                if (privateNetwork_map.containsKey(router_str)) {
                    costs = privateNetwork_map.get(router_str);
                } else {
                    costs = new TreeMap<>();
                }
                costs.put(routerB, network.get(router_str).get(routerB));
                privateNetwork_map.put(router_str, costs);
            }
        }

        generateRouterTable();

        //when ttl is 0, dump the package.
        if (linkStatePackage.getTTL() <= 0) return null;
        List<String> receivers = new ArrayList<>();
        for (String router : privateNetwork_map.get(id).keySet()) {
            if (privateNetwork_map.get(id).get(router) != null) receivers.add(router);
        }
        linkStatePackage.setReceiver(receivers);
        linkStatePackage.setForwardBy(id);
        return linkStatePackage;

    }
    /*
     * use dj algorithm get path.
     */
    private void generateRouterTable() {
        // initialize
        Set<String> visit_set = new HashSet<>(privateNetwork_map.keySet());
        Map<String, Integer> distance = new HashMap<>();
        Map<String, List<String>> path = new HashMap<>();

        for (String router_str : privateNetwork_map.get(id).keySet()) {
            // init distance;
            distance.put(router_str, privateNetwork_map.get(id).get(router_str));
            // init path;
            if (distance.get(router_str) != null) {
                List<String> route = new ArrayList<>();
                route.add(router_str);
                path.put(router_str, route);
            }
        }
        visit_set.remove(id);
        while (!visit_set.isEmpty()) {
            // find out the nearest v in V.
            String nearest = null;
            Integer nearestDistance = null;
            /*
             * get the nearest point distance and id.
             */
            for (String router_str : distance.keySet()) {
                if (!visit_set.contains(router_str)) continue;
                Integer d = distance.get(router_str);
                if (d == null) continue;
                if (nearestDistance == null || nearestDistance > d) {
                    nearestDistance = d;
                    nearest = router_str;
                }
            }

            // if the nearest is null, break. update until null.
            if (nearest == null) break;

            // put the V into S.
            visit_set.remove(nearest);
            Map<String, Integer> subDistance = privateNetwork_map.get(nearest);
            int distanceTo = distance.get(nearest);
            List<String> pathTo = path.get(nearest);
            for (String router_str : subDistance.keySet()) {
                if (subDistance.get(router_str) == null) continue;
                Integer currentDistance = distance.get(router_str);
                Integer newDistance = distanceTo + subDistance.get(router_str);
                if (currentDistance == null || currentDistance > newDistance) {
                    // update path and distance;
                    distance.put(router_str, newDistance);
                    List<String> newPath = new ArrayList<>(pathTo);
                    newPath.add(router_str);
                    path.put(router_str, newPath);
                }
            }
        }
        // write in the routing_Table;
        routing_Table = new HashMap<>();
        for (String router : path.keySet()) {
            routing_Table.put(router, path.get(router).get(0));
        }
    }


    public LinkPackage originatePacket() {
        // if shut down ,return null;
        if (!on) return null;
        // deal with the ticks.
        for (String routerId : connections_map.keySet()) {
            if (routerId.equals(id)) continue;
            int ticks = tickCounter_map.get(routerId) + 1;
            tickCounter_map.put(routerId, ticks);
            if (ticks >= 2) {
                Map<String, Integer> disconnectedRouterCosts = privateNetwork_map.get(routerId);
                for (String routerId1 : disconnectedRouterCosts.keySet()) {
                    disconnectedRouterCosts.put(routerId, null);
                    Map<String, Integer> networkCost = privateNetwork_map.get(routerId1);
                    networkCost.put(routerId, null);
                    privateNetwork_map.put(routerId1, networkCost);
                }
                privateNetwork_map.put(routerId, disconnectedRouterCosts);
            }
        }
        List<String> receivers = new ArrayList<>();
        sequenceNumber++;
        for (String router : privateNetwork_map.get(id).keySet()) {
            if (privateNetwork_map.get(id).get(router) != null)
            	receivers.add(router);
        }
        return new LinkPackage(id, sequenceNumber, privateNetwork_map, receivers);
    }
}
