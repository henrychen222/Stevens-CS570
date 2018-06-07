

import java.io.IOException;
import java.util.Scanner;
/**

 *
 * Test class.
 */
public class Execute {
	public static void main(String[] args) throws IOException {
    	//Initialization:
        Network netWork = new Network(args[0]);
        //Set IO scanner to read commands.
        Scanner scanner = new Scanner(System.in);
        //Set loop marker
        boolean isContinue = true;
        /*
         * Read commands:
         * Continue	:	"C"
         * Quit 	:	"Q"
         * Print ID :	"P <ID>" 	(Example: P 2   this will print router 2's routing table)
         * Shut down:	"S <ID>"	(Example: S 3   this will shut down router 3)
         * Start 	: 	"S <ID>"	(Example: S 4   this will start up router 4)
         */
        System.out.println("Network Initialized.");
        netWork.connect();
        System.out.println("P1 router table is :");
        netWork.printRoutingTable("1");

        while (isContinue) {
            System.out.println("Continue(C)/Quit(Q)/Shut Down(S <ID>)/Start Up(T <ID>)/Print(P<ID>)?");
            System.out.println("<ID> ID, separated by at least one space.");
            String[] command = scanner.nextLine().split("\\s+");
            if("c".equalsIgnoreCase(command[0])) 		netWork.connect();
            else if ("q".equalsIgnoreCase(command[0])) 	isContinue=false;
            else if ("p".equalsIgnoreCase(command[0])){
            	if(TestLength(command)){
            		netWork.printRoutingTable(command[1]);
            	}
            }else if ("s".equalsIgnoreCase(command[0])){
            	if(TestLength(command)){
            		netWork.shutDownRouter(command[1]);
            	}
            }else if ("t".equalsIgnoreCase(command[0])){
            	if(TestLength(command)){
            		netWork.startUpRouter(command[1]);
            	}
            }else System.out.println( " Wrong commands.");
        }
        scanner.close();
    }

	private static boolean TestLength(String[] command) {
		if (command.length == 1) {
            System.out.println("Invalid commands.Please try again.");
    		return false;
        }else return true;

	}

}
