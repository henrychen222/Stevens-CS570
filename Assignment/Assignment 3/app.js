const fs = require('fs');
const prompt = require('prompt-sync')();
var input = fs.readFileSync('infile.dat', "utf8");
input = input.replace(/\W/g, "");
this.total_string = input.split("").length;

//Cited some codes from here
class Node {
    constructor(left, right, parent, c, weight) {
        this.left = left;
        this.right = right;
        this.parent = parent;
        if (left) {
            left.parent = this;
        }
        if (right) {
            right.parent = this;
        }
        this.c = c;
        this.weight = weight;
    }
}

function getPath(no) {
    var path = '';
    var node = no;
    while (node) {
        var parent = node.parent;
        if (parent) {
            if (node == parent.left) {
                path = '0' + path;
            }
            if (node == parent.right) {
                path = '1' + path;
            }
        }
        node = parent;
    }
    return path;
}
//Cite end




function main() {
    // Get input

    var input = fs.readFileSync('infile.dat', "utf8");
    var str = input.replace(/\W/g, "");
    this.total_string = input.split("").length;
    // var str = input;

    for (i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            //console.log(str[i]);
            str[i] = String(str[i]);
            //console.log("ssssss" + str[i]);
        }
    }




    //Sort input array
    var map1 = {};
    var i = 0;
    var ab = [];
    var charC = [];
    while (str[i]) {
        map1[str[i]] ? map1[str[i]]++ : (map1[str[i]] = 1);

        i++;
    }

    i = 0;
    for (cc in map1) {
        if (!isNaN(cc)) {
            //console.log(cc);
            cc = cc.toString();
        }
    }


    for (cc in map1) {
        ab[i] = map1[cc];
        charC[i] = cc;
        i++
    }
    for (var i2 = 0; i2 < ab.length; i2++) {
        //console.log("+++"+ab[i2]);
    }


    var swap, swapc;
    swap = 0;
    swapc = ' ';
    for (var i = 0; i < ab.length; i++) {
        for (var j = ab.length - 1; j > i; j--) {

            if (ab[i] < ab[j]) {
                swap = ab[j];
                swapc = charC[j];

                ab[j] = ab[i];
                ab[i] = swap;


                charC[j] = charC[i];
                charC[i] = swapc;
            }

        }
    }
    for (var i2 = 0; i2 < ab.length; i2++) {
        //console.log("---"+ab[i2]);
    }


    var SStr = "";
    for (var k = 0; k < ab.length; k++) {
        for (var z = 0; z < ab[k]; z++) {
            SStr += charC[k];
        }
    }

    //console.log("&&&"+SStr);
    var infile = SStr;




    // Frequency


    var maps = {};
    var i = 0;
    while (infile[i]) {
        maps[infile[i]] ? maps[infile[i]]++ : (maps[infile[i]] = 1);
        i++;


    }
    var alphabet = [];
    for (var c in maps) {
        var node = new Node(null, null, null, c, maps[c]);
        alphabet.push(node);
    }

    // Get huffman codes
    //Cited some codes from here

    alphabet.sort((a, b) => {
        if (a.weight == b.weight) {
            return a.c.charCodeAt(0) < b.c.charCodeAt(0) ? -1 : 1;
        }
        return a.weight > b.weight ? -1 : 1;
    });

    var node_arry = alphabet.slice(0);


    function outputObj(obj) {
        var description = "";
        for (var i in obj) {
            description += i + " = " + obj[i] + "\n";
        }
        return description;
    }
    //console.log(outputObj(maps));
    //console.log(map1);
    //console.log("node_arry");
    //console.log(node_arry);






    while (node_arry.length > 1) {
        var least = node_arry.pop();
        var second = node_arry.pop();
        var node = new Node(second, least, null, null, least.weight + second.weight);
        if (node_arry.length == 0) {
            node_arry.push(node);
        } else {
            var added_mark = false;
            for (var i = 0; i < node_arry.length; i++) {
                if (node.weight > node_arry[i].weight) {
                    //Add node to array
                    node_arry.splice(i, 0, node);
                    added_mark = true;
                    break;
                }
            }
            if (!added_mark) {
                node_arry.push(node);
            }
        }
    }
    //Cited end

    // write output

    var bits = 0;
    var output1 = "";


    var sum = 0;

    for (var c in maps) {

        sum += parseInt(maps[c])
    }



    output1 += "Symbol|frequency\r\n"



    for (let node of alphabet) {
        output1 += node.c + "|" + parseFloat((node.weight / infile.length).toFixed(4)) * 100 + '%' + "\r\n";
    }
    output1 += 'Symbol|Code\r\n';

    for (let node of alphabet) {
        var path = getPath(node);
        output1 += node.c + "|" + path + '\n';
        bits += node.weight * path.length;
    }
    output1 += '\nTotal Bits: ' + bits;
    fs.writeFileSync("outfile.dat", output1);
    console.log(output1);
    console.log("outfile.dat created");
}


main();