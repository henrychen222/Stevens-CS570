
var prompt = require('prompt');
var prompt = require('prompt-sync')();


class CircularQueue {
    constructor(size) {
        this.ll = new LinkedList(size);
    }
    enQueue(e) {
        this.ll.add(e);
    }
    deQueue() {
        return this.ll.remove();
    }
    isEmpty() {
        return this.ll.length == 0;
    }
}
class Node {
    constructor(data) {
        this.data = data;
        this.next = null
    }
}
class LinkedList {
    constructor(size) {
        this.tail = null;
        this.length = 0;
        this.size = size;
    }
    add(data) {
        var node = new Node(data);
        if (!this.tail) {
            this.tail = node;
            this.tail.next = this.tail;
            this.length++;
            return;
        }
        var head = this.tail.next;
        if (this.length == this.size) {
            this.tail = head;
            this.tail.data = data;
        } else {
            this.tail.next = node;
            this.tail = node;
            this.tail.next = head;
            this.length++;
        }
    }
    remove() {
        if (this.tail.next) {
            var head = this.tail.next;
            this.tail.next = head.next;
            this.length--;
            return head.data;
        }
    }
}


function main() {
    var cq = new CircularQueue(12);
    var solution_content = null;
    if (solution_content!='quit') {
    while (solution_content!='quit'){
    console.log("For example like: ( 1 + 1 * 1 ^ 2 ) * 3 + 1 + 3 + 3 * 2, (or 'quit' to exit):");
    solution_content = prompt();  
    cq.enQueue(solution_content);
}
}

     while (!cq.isEmpty()) {
        // for(i=0;i<cq.size - 1;i++){
             var e = cq.deQueue();
                console.log(e);
        // }
               
        }


    
}
main();