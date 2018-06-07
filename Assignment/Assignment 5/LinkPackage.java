
import java.util.List;
import java.util.Map;


public class LinkPackage {
    //    ID of the router that originates the LSP.
    private String originate_str;
    private int SN_int;
    //    Time to live, decremented each time the LSP is forwarded; with an initial value of 10.
    private int TTL_int;
//    Either of the following at your option:
//    A list that indicates each reachable network (indicated by the network name stored in the router's string).
//    A list that indicates each directly connected router, the network behind each one, and the cost to get to that router.
    private Map<String, Map<String, Integer>> privateNetwork_map;
    private List<String> receiver_list;
    private String forwardBy;

    public LinkPackage(String originate, int sequenceNumber, Map<String, Map<String, Integer>> privateNetwork, List<String> receiver) {
        this.originate_str = originate;
        forwardBy = originate;
        this.SN_int = sequenceNumber;
        this.privateNetwork_map = privateNetwork;
        TTL_int = 10;
        this.receiver_list = receiver;
    }
    /*
     * return forwordby
     */
    public String getForwardBy() {
        return forwardBy;
    }
    /*
     * set forwordby to new string.
     */
    public void setForwardBy(String forwardBy) {
        this.forwardBy = forwardBy;
    }
    /*
     * get receiver list
     */
    public List<String> getReceiver() {
        return receiver_list;
    }
    /*
     * set receiver list to a new list
     */
    public void setReceiver(List<String> receiver) {
        this.receiver_list = receiver;
    }
    /*
     * get TTL value.
     */
    public int getTTL() {
        return TTL_int;
    }
    /*
     * get SequenceNumber value;
     */
    public int getSequenceNumber() {
        return SN_int;
    }
    /*
     * get PrivateNetwork map.
     */
    public Map<String, Map<String, Integer>> getPrivateNetwork() {
        return privateNetwork_map;
    }
    /*
     * get originate string.
     */
    public String getOriginate() {
        return originate_str;
    }
    /*
     * TTL - 1.
     */
    public void visit() {
        TTL_int--;
    }
    public void setTTL(int t){
    	this.TTL_int=t;
    }

}
