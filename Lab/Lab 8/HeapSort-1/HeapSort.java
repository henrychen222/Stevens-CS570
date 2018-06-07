

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Scanner;

public class HeapSort {

    static int left(int i){
        return i * 2 + 1;
    }
    static int right(int i){
        return i * 2 + 2;
    }
    int parent(int i){
        return (i - 1) / 2;
    }
  //We cited some codes from here 
    public static void MaxHeapify(Heap heap, int i){
        int l = left(i);
        int r = right(i);
        int largest;
        if(l < heap.getHeapSize() && heap.getA().get(l) > heap.getA().get(i)){
            largest = l;
        }else{
            largest = i;
        }
        if(r < heap.getHeapSize() && heap.getA().get(r) > heap.getA().get(largest)){
            largest = r;
        }
        if(largest != i){
            int temp = heap.getA().get(i);
            heap.getA().set(i, heap.getA().get(largest));
            heap.getA().set(largest, temp);
        }else{
            return;
        }
        MaxHeapify(heap, largest);
    }

    public static void BuildMaxHeap(Heap heap){
        int heapsize = heap.getHeapSize();
        for(int i = (heapsize - 1) / 2; i >= 0; i--){
            MaxHeapify(heap, i);
        }
    }

    public static void HeapSort(Heap heap){
        BuildMaxHeap(heap);
        int length = heap.getA().size(), heapSize = heap.getHeapSize();
        System.out.print("Now the size of heap is:  ");
        System.out.println(heap.getHeapSize());
        for(int i = length - 1; i > 0; i--){
            int temp = heap.getA().get(i);
            heap.getA().set(i, heap.getA().get(0));
            heap.getA().set(0, temp);
            //Remove the max element from heap by reduce heapSize
            heap.setHeapSize(--heapSize);
            //You can use this code to check the size changed of heap
            System.out.println("The " + (length - i) + " number is: ");
            System.out.println(heap.getA().get(i));
            System.out.print("Now the size of heap is:  ");
            System.out.println(heap.getHeapSize());
           
            MaxHeapify(heap, 0);
        }
        System.out.println("The 10 number is: ");
        System.out.println(heap.getA().get(1));
    }
  //Cited end
  

    public static void main(String[] args) {
    	Scanner input = new Scanner(System.in);
        Heap heap = new Heap();
        int[] array = new int[10];
        System.out.println("Please input 10 numbers 1 line at a time.");
        for (int i = 0; i < array.length; i++) array[i] = input.nextInt();
        
        //Test num
        //int[] array3 = new int[]{4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
		
		ArrayList<Integer> A = new ArrayList<>();
        
       
        for(int x : array){
            A.add(x);
        }
        heap.setA(A);
       
        heap.setHeapSize(array.length);
        HeapSort(heap);
     
       
        //System.out.println(heap.getA());
//        System.out.println("The sorted numbers like follow: ");
//        for(int i= heap.getA().size() - 1;i >= 0;i--){
//        	   System.out.println(heap.getA().get(i) + " ");
//        	}        
      
    }
}
    
  