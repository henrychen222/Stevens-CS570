
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

public class Network {
    private Map<String, Router> network;

    public Network(String path) throws IOException {
        readFile(path);
    }

    private void readFile(String path) throws IOException {
        network = new TreeMap<>();
        File file = new File(path);
        try (FileReader fileReader = new FileReader(file);BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String line;
            Map<String, Integer> connections = new TreeMap<>();
            String routerName = "";
            String routerId = "";

//          while((line = bufferedReader.readLine()) != null){
//        	if(line.indexOf(".")!=-1){
//       		 	String[] strings = line.split("\\s+");
//        		connections = new TreeMap<>();
//        		routerId = strings[0];
//        		routerName = strings[1];
//        		connections.put(routerId, 0);
//        		if(!"".equals(routerId)){
//        			network.put(routerId, new Router(routerId, routerName, connections));
//        		}
//        	}else{
//        		String[] strings = line.split("\\s+");
//        		int distance;
//        		if (strings.length == 2) distance = 1;
//        		else distance = Integer.parseInt(strings[2]);
//        		connections.put(strings[1], distance);
//        	}
//        }
            while ((line = bufferedReader.readLine()) != null) {
                if (line.indexOf(".")==-1) {
                    String[] strings = line.split("\\s+");
                    int distance;
                    if (strings.length == 2) distance = 1;
                    else distance = Integer.parseInt(strings[2]);
                    connections.put(strings[1], distance);
                } else {
                    if (!"".equals(routerId)) {
                        network.put(routerId, new Router(routerId, routerName, connections));
                    }
                    connections = new TreeMap<>();
                    String[] strings = line.split("\\s+");
                    routerId = strings[0];
                    routerName = strings[1];
                    connections.put(routerId, 0);
                }
            }
            if (!"".equals(routerId))
                network.put(routerId, new Router(routerId, routerName, connections));
        }
    }

    public void shutDownRouter(String routerId) {
        Router router = network.get(routerId);
        if(nullTest(router)){
            router.shutDown();
            network.put(routerId, router);
            System.out.println("Router " + routerId + " has been Shut Down.");
        }
    }

    public void startUpRouter(String routerId) {
        Router router = network.get(routerId);
        if(nullTest(router)){
	        router.startUp();
	        network.put(routerId, router);
	        System.out.println("Router " + routerId + " has been Start Up");
        }
    }


    public void connect() {
        for (String routerId : network.keySet()) {
            Router router = network.get(routerId);
            if(nullTest(router)){
                LinkPackage linkStatePackage = router.originatePacket();
                Trans(linkStatePackage);
            }

        }
    }
    /*
     * forward linkstate package
     */
    private void Trans(LinkPackage linkStatePackage) {
        if (linkStatePackage == null) return;
        for (String routerId : linkStatePackage.getReceiver()) {
            Router router = network.get(routerId);
            LinkPackage newLinkStatePackage = router.receivePacket(linkStatePackage, linkStatePackage.getForwardBy());
            network.put(routerId, router);
            Trans(newLinkStatePackage);
        }
    }
    /*print the routing table,format like this:
   	 * network, cost, outgoing link
     * network, cost, outgoing link
     * network, cost, outgoing link
     * network, cost, outgoing link
     * etc...
     */
    public void printRoutingTable(String routerId) {
        Router router = network.get(routerId);
        if(nullTest(router)){
	        if(!router.getState()) {
	        	System.out.println("current rounter shut down. Print the rount table before closed.");
	        }
		        Map<String, String> routingTable = router.getRoutingTable();
		        System.out.println("The routing table for " + routerId + " is:");
		        StringBuilder sb=new StringBuilder();
	        for (String r : routingTable.keySet()) {
	        	sb.append(network.get(r).getNetworkName() + ", " + routingTable.get(r));
	        	sb.append("\n");
	        }
	        System.out.println(sb.toString());
        }
    }
    public boolean nullTest(Router router){
    	if (router == null) {
            System.out.println("Invalid router ID. Pls Try Again.");
            return false;
        }
    	return true;
    }
}
