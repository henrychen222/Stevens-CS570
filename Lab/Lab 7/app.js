'use strict';
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const fs = require('fs');
var prompt = require('prompt');
var prompt = require('prompt-sync')();


function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype.add = function (data) {
    var node = new Node(data);
    if (!this.root) {
        this.root = node;
    } else {
        var current = this.root;
        while (current) {
            if (node.data < current.data) {
                if (!current.left) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else if (node.data > current.data) {
                if (!current.right) {
                    current.right = node;
                    break;
                }
                current = current.right;
            } else {
                break;
            }
        }
    }
};

BinarySearchTree.prototype.remove = function (data) {
    var that = this;
    var removeNode = function (node, data) {
        if (!node) {
            return null;
        }
        if (data === node.data) {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            // 2 children
            var temp = that.getMin(node.right);
            node.data = temp;
            node.right = removeNode(node.right, temp);
            return node;
        } else if (data < node.data) {
            node.left = removeNode(node.left, data);
            return node;
        } else {
            node.right = removeNode(node.right, data);
            return node;
        }
    };
    this.root = removeNode(this.root, data);
};

BinarySearchTree.prototype.contains = function (data) {
    var current = this.root;
    while (current) {
        if (data === current.data) {
            return true;
        }
        if (data < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return false;
};
BinarySearchTree.prototype._preOrder = function (node, fn) {
    if (node) {
        if (fn) {
            fn(node);
        }
        this._preOrder(node.left, fn);
        this._preOrder(node.right, fn);
    }
};
BinarySearchTree.prototype._inOrder = function (node, fn) {
    if (node) {
        this._inOrder(node.left, fn);
        if (fn) {
            fn(node);
        }
        this._inOrder(node.right, fn);
    }
};
BinarySearchTree.prototype._postOrder = function (node, fn) {
    if (node) {
        this._postOrder(node.left, fn);
        this._postOrder(node.right, fn);
        if (fn) {
            fn(node);
        }
    }
};
BinarySearchTree.prototype.traverseDFS = function (fn, method) {
    var current = this.root;
    if (method) {
        this['_' + method](current, fn);
    } else {
        this._preOrder(current, fn);
    }
};
BinarySearchTree.prototype.traverseBFS = function (fn) {
    this.queue = [];
    this.queue.push(this.root);
    while (this.queue.length) {
        var node = this.queue.shift();
        if (fn) {
            fn(node);
        }
        if (node.left) {
            this.queue.push(node.left);
        }
        if (node.right) {
            this.queue.push(node.right);
        }
    }
};
BinarySearchTree.prototype.print = function () {
    if (!this.root) {
        return console.log('No root node found');
    }
    var newline = new Node('|');
    var queue = [this.root, newline];
    var string = '';
    while (queue.length) {
        var node = queue.shift();
        string += node.data.toString() + ' ';
        if (node === newline && queue.length) {
            queue.push(newline);
        }
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    console.log(string.slice(0, -2).trim());
};
BinarySearchTree.prototype.printByLevel = function () {
    if (!this.root) {
        return console.log('No root node found');
    }
    var newline = new Node('\n');
    var queue = [this.root, newline];
    var string = '';
    while (queue.length) {
        var node = queue.shift();
        string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
        if (node === newline && queue.length) {
            queue.push(newline);
        }
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    console.log(string.trim());
};
BinarySearchTree.prototype.getMin = function (node) {
    if (!node) {
        node = this.root;
    }
    while (node.left) {
        node = node.left;
    }
    return node.data;
};
BinarySearchTree.prototype.getMax = function (node) {
    if (!node) {
        node = this.root;
    }
    while (node.right) {
        node = node.right;
    }
    return node.data;
};
BinarySearchTree.prototype._getHeight = function (node) {
    if (!node) {
        return -1;
    }
    var left = this._getHeight(node.left);
    var right = this._getHeight(node.right);
    return Math.max(left, right) + 1;
};
BinarySearchTree.prototype.getHeight = function (node) {
    if (!node) {
        node = this.root;
    }
    return this._getHeight(node);
};
BinarySearchTree.prototype._isBalanced = function (node) {
    if (!node) {
        return true;
    }
    var heigthLeft = this._getHeight(node.left);
    var heigthRight = this._getHeight(node.right);
    var diff = Math.abs(heigthLeft - heigthRight);
    if (diff > 1) {
        return false;
    } else {
        return this._isBalanced(node.left) && this._isBalanced(node.right);
    }
};
BinarySearchTree.prototype.isBalanced = function (node) {
    if (!node) {
        node = this.root;
    }
    return this._isBalanced(node);
};
BinarySearchTree.prototype._checkHeight = function (node) {
    if (!node) {
        return 0;
    }
    var left = this._checkHeight(node.left);
    if (left === -1) {
        return -1;
    }
    var right = this._checkHeight(node.right);
    if (right === -1) {
        return -1;
    }
    var diff = Math.abs(left - right);
    if (diff > 1) {
        return -1;
    } else {
        return Math.max(left, right) + 1;
    }
};
BinarySearchTree.prototype.isBalancedOptimized = function (node) {
    if (!node) {
        node = this.root;
    }
    if (!node) {
        return true;
    }
    if (this._checkHeight(node) === -1) {
        return false;
    } else {
        return true;
    }
};

function readFile() {
    var file_info = fs.readFileSync("infile.dat", "utf8");
    //console.log(file_info);
    var ss = file_info.split(",");// 在每个逗号(,)处进行分解。
    //console.log(ss);
    return ss;
}




var search1 = null
var search2 = []

var binarySearchTree = new BinarySearchTree();
var arry = readFile();
console.log(arry);
for (var i = 0; i < arry.length; i++) {
    search2 = arry[i];
    search1 = parseInt(search2);
    binarySearchTree.add(search1);
}


binarySearchTree.print();




var solution_content = null;
while (solution_content != 'quit') {
    console.log("Please input the vaule you search. Input quit to quit");
    solution_content = prompt();
    if (solution_content != 'quit') {

        var search = parseFloat(solution_content);
        var contain = binarySearchTree.contains(search);
        if(contain==true){
        console.log('YES');
        }
        else{
        console.log('NO');
        }
        //console.log(binarySearchTree.contains(search));
    }
    else if (solution_content == 'quit') {
        break;

    }

}
