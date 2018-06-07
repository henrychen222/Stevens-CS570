const readline_sync = require('readline-sync');
var prompt = require('prompt');
var prompt = require('prompt-sync')();
var abc = null;


// This Stack is written using the pseudoclassical pattern
function Stack() {
    //var items = [];
    this.items = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    //this.printElement = printStack;

    function push(element) {
        this.items[this.top++] = element;
    }

    function pop() {
        //return this.items[--this.top];
        if (this.top === 0) return;
        var item = this.items[this.top - 1]
        this.items.length = --this.top;
        return item;
    }



    function peek() {
        return this.items[this.top - 1];
    }

    function clear() {
        this.top = 0;
    }

    function length() {
        return this.top;
    }


    function printStack() {
        while (this.top > 0) {
            document.writeln(this.pop() + "&nbsp;&nbsp;");
        }
    }
}



function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.isEmpty = isEmpty;
}

function enqueue(element) {
    this.dataStore.push(element);
}

function dequeue() {
    return this.dataStore.shift();
}

function front() {
    return this.dataStore[0];
}

function back() {
    return this.dataStore[this.dataStore.length - 1];
}

function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i] + "\n";
    }
    return retStr;
}

function isEmpty() {
    if (this.top == 0) {
        return true;
    } else {
        return false;
    }
}


function suffixExpression() {
    var str1 = solution_content;
    var str = [];
    str = str1.split(" ");
    var yesorn = true;
   
    //console.log(str);

    var stack = new Stack();
    var outStack = new Queue();
    for (var i = 0; i < str.length; i++) {
        //console.log("Loop" + (i + 1));
       

        if (str[i] == ')') {
            while (stack.peek() == '+' || stack.peek() == '-' || stack.peek() == '*' || stack.peek() == '/' || stack.peek() == '%' || stack.peek() == '^') {

                outStack.enqueue(stack.peek());
                //console.log("Stack = " + stack.peek());
                stack.pop();
                //console.log("TOP now = " + stack.peek());
                //console.log("Stack now = " + stack.items);
            }
            stack.pop();
            //console.log("TOP now = " + stack.peek());
            //console.log("Stack now = " + stack.items);

        }
       

        else if (str[i] == '-' || str[i] == '+') {
            if (stack.peek() == '*' || stack.peek() == '/' || stack.peek() == '%' || stack.peek() == '^') {
                while (stack.peek() == '*' || stack.peek() == '/' || stack.peek() == '%' || stack.peek() == '^') {
                    outStack.enqueue(stack.peek());
                    stack.pop();
                    //console.log('is: ' + outStack.dataStore.join(" "))

                }
                stack.push(str[i]);
            } else {
                stack.push(str[i]);
                //console.log('is: ' + outStack.dataStore.join(" "))
            }
        } else if (str[i] == '*' || str[i] == '/' || str[i] == '%') {
            if (stack.peek() == '^') {
                // while (stack.peek()=='^') {
                outStack.enqueue(stack.peek());
                stack.pop();
                stack.push(str[i]);
            }
            //}
            else {
                stack.push(str[i]);
            }
        }
        else if (str[i] == '^' || str[i] == '(') {
            stack.push(str[i]);
        }

        else {
            outStack.enqueue(str[i]);
        }
        //console.log("Stack");
        //console.log(stack.items);
        //console.log("Stack.top");
        //console.log(stack.peek());
        //console.log("Queue");
        //console.log(outStack.dataStore);
    }
    //console.log(stack.dataStore.join(" "))
    var op = stack.items;
    //console.log(op);
    //console.log("----");
    //console.log(op.length);

    for (var i = op.length; i >= 0; i--) {
        outStack.enqueue(op[i - 1]);
    }
    // for (var i=0; i< outStack.length; i++) {
    //     console.log(outStack[i]);
    // }
    console.log('The postfix formation after convertion is: ' + outStack.dataStore.join(" "));
    // console.log(outStack.dataStore.join(" "));
    // fixed = outStack.dataStore.join(" ");
    return outStack.dataStore;

}



// ------------------------------------------------------------------------------------
function isOperator(s) {
    switch (s) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '^':
            return false;
        default:
            return true;
    }
}

// ------------------------------------------------------------------------------------
function calculate() {
    var postfixQ = suffixExpression();
    //console.log(postfixQ);
    var evalStack = new Stack();
    var answer = 0;
    for (var i = 0; i < postfixQ.length; i++) {
        if (isOperator(postfixQ[i])) {
            evalStack.push(postfixQ[i]);
        }
        else {
            var topNum = evalStack.pop();
            var nextNum = evalStack.pop();
            if (postfixQ[i] == '+') {
                answer = parseInt(nextNum) + parseInt(topNum);
            }
            else if (postfixQ[i] == '-') {
                answer = parseInt(nextNum) - parseInt(topNum);
            }
            else if (postfixQ[i] == '*') {
                answer = parseInt(nextNum) * parseInt(topNum);
            }
            else if (postfixQ[i] == '/') {
                answer = parseInt(nextNum) / parseInt(topNum);
            }
            else if (postfixQ[i] == '%') {
                answer = parseInt(nextNum) % parseInt(topNum);
            }
            else if (postfixQ[i] == '^') {
                answer = Math.pow(parseInt(nextNum), parseInt(topNum));
            }
            evalStack.push(answer.toString());
        }
        //console.log(evalStack.dataStore);
        var ans = evalStack.items[0];
    }
    console.log("The answer is " + ans);
}

console.log("Reverse Polish Notation Calculator");

console.log("------------------------------------------------------------------------------------");


console.log("Please input the infix math problem. Every characters in formation must be separated by \" \" include parentheses");
console.log("For example like: ( 1 + 1 * 1 ^ 2 ) * 3 + 1 + 3 + 3 * 2, (or 'quit' to exit):");
var solution_content = prompt();


while (solution_content != 'quit') {

    console.log('The original input math problem in infix formation is: ' + solution_content);
 
    calculate();
    console.log("Please input the infix math problem. Every characters in formation must be separated by \" \" include  parentheses");
    console.log("For example like: ( 1 + 1 * 1 ^ 2 ) * 3 + 1 + 3 + 3 * 2, (or 'quit' to exit):");

    solution_content = prompt();
}






