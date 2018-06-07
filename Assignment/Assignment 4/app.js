'use strict';
var prompt_f = require("prompt-sync");
var prompt = prompt_f();
var fs = require("fs");
var prompt = require('prompt');
var prompt = require('prompt-sync')();
var input = fs.readFileSync('companies.dat', "utf8");
var companies = input.split("\n");
//console.log(companies);
var companies_table = {};
var companies_table1 = {};
//cite some codes from here

for (var i = 0; i < companies.length; i++) {
    var company_alias = companies[i].split("\t");
    for (var j = 0; j < company_alias.length; j++) {

        var subcompany = company_alias[j].replace(",", "").replace(".", "").trim();
        //.replace(" ", "")

        if (subcompany.indexOf(company_alias[0]) != -1 && subcompany != company_alias[0]) {
            continue;
        }
        else {
            companies_table1[subcompany] = company_alias[0];
        }
    }
}



for (var i = 0; i < companies.length; i++) {
    var company_alias = companies[i].split("\t");
    for (var j = 0; j < company_alias.length; j++) {
        
        var subcompany = company_alias[j].replace(",", "").replace(".", "").replace(" ", "").trim();
        //.replace(" ", "")

        if (subcompany.indexOf(company_alias[0]) != -1 && subcompany != company_alias[0]) {
            continue;
        }
        else {
            companies_table[subcompany] = company_alias[0];
        }
    }
}

//公司名称表
console.log("The dictionary of Trie Tree like this");
console.log(companies_table1);
//公司名称表的value值
var abcd = [];
for (var key in companies_table) {
    abcd.push(companies_table[key]);
}

for (var key in companies_table) {
    abcd.push(key);
}



//console.log(abcd);

//去重
Array.prototype.distinct = function () {
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}
var companies_table_new = abcd.distinct();
//console.log(abcd.distinct());

//Put all companies name in an array
var abc = [];
for (var key in companies_table) {
    abc.push(key);
}
//console.log("------" + abc);




class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    isValid(str) {
        return /^[\ |\A-Za-z\s]*$/i.test(str);
    }
    insert(word) {
        // addWord
        if (this.isValid(word)) {
            var cur = this.root;
            for (var i = 0; i < word.length; i++) {
                var c = word.charCodeAt(i);
                c -= 48; //减少”0“的charCode
                var node = cur.son[c];
                if (node == null) {
                    var node = (cur.son[c] = new TrieNode());
                    node.value = word.charAt(i);
                    node.numPass = 1; //有N个字符串经过它
                } else {
                    node.numPass++;
                }
                cur = node;
            }
            cur.isEnd = true;//樯记有字符串到此节点已经结束
            cur.numEnd++; //这个字符串重复次数

            return true;
        } else {
            return false;
        }
    }
    preTraversal(cb) {
        function preTraversalImpl(root, str, cb) {
            cb(root, str);
            for (let i = 0, n = root.son.length; i < n; i++) {
                let node = root.son[i];
                if (node) {
                    preTraversalImpl(node, str + node.value, cb);
                }
            }
        }
        preTraversalImpl(this.root, "", cb);
    }
    
    isContainPrefix(word) {
        if (this.isValid(word)) {
            var cur = this.root;
            for (var i = 0; i < word.length; i++) {
                var c = word.charCodeAt(i);
                c -= 48; //减少”0“的charCode
                if (cur.son[c]) {
                    cur = cur.son[c];
                } else {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    isContainWord(str) {
        // 在字典树中查找是否存在某字符串(不为前缀)
        if (this.isValid(word)) {
            var cur = this.root;
            for (var i = 0; i < word.length; i++) {
                var c = word.charCodeAt(i);
                c -= 48; //减少”0“的charCode
                if (cur.son[c]) {
                    cur = cur.son[c];
                } else {
                    return false;
                }
            }
            return cur.isEnd;
        } else {
            return false;
        }
    }
    countPrefix(word) {
        // 统计以指定字符串为前缀的字符串数量
         
        if (this.isValid(word)) {
            var cur = this.root;
            for (var i = 0; i < word.length; i++) {
                var c = word.charCodeAt(i);
                c -= 48; //减少”0“的charCode
                if (cur.son[c]) {
                    cur = cur.son[c];
                } else {
                    return 0;
                }
            }
            return cur.numPass;
        } else {
            return 0;
        }
    }
    countWord(word) {
        // 统计某字符串出现的次数方法
        if (this.isValid(word)) {
            var cur = this.root;
            for (var i = 0; i < word.length; i++) {
                var c = word.charCodeAt(i);
                c -= 48; //减少”0“的charCode
                if (cur.son[c]) {
                    cur = cur.son[c];
                } else {
                    return 0;
                }
            }
            return cur.numEnd;
        } else {
            return 0;
        }
    }
}

class TrieNode {
    constructor() {
        this.numPass = 0;//有多少个单词经过这节点
        this.numEnd = 0; //有多少个单词就此结束
        this.son = [];
        this.value = ""; //value为单个字符
        this.isEnd = false;
    }
}



function isPromptEnd(sub_article) {
    for (var i in sub_article) {
        if (sub_article[i] == '.') {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}
//cite end 

var trie = new Trie();

var arr = [];
var total_words = 0;
var total_words2 = 0;

console.log('You want to test a string or prompt a string to test ? \ninput \"y\" to test a string or input \"n\" to prompt. Input \".\" to quit');
var yesorno = prompt();
var number = 0;

while (true) {
    if (yesorno == "y") {
        
        var sub_article1 = 'Microsoft, and apple. hava an XBox and IOS Verizon JPMorgan Chase Morgan Stanley Microsys a an and the or but adadad';
        console.log("Now testing..." + sub_article1); 

        
    }
    else {
        console.log('Please input string separated by space');
        var sub_article1 = prompt();
       
    }

    if (isPromptEnd(sub_article1)) {
        break;
    }

    var sub_article = sub_article1.replace(/[\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
  
    //输入数据的处理，用空格分开，去除 a an 等
    /^[\ |\A-Za-z\s]*$/
    var str1 = [];
    str1 = sub_article.match(/[a-z]+[\-\']?[a-z]*/ig); 
    var sub_article_arr = sub_article.split(" ");
    var sub_article_arr = sub_article.match(/[a-z]+[\-\']?[a-z]*/ig);

    //console.log('sub_article_arr1');
    //console.log(sub_article_arr);
    //console.log(str1);
    //console.log(str1[0]);
    //console.log(str1[1]);


    for (var num = sub_article_arr.length - 1; num >= 0; num--) {
        if (sub_article_arr[num] == 'a' || sub_article_arr[num] == 'an' || sub_article_arr[num] == 'the' || sub_article_arr[num] == 'and' || sub_article_arr[num] == 'or' || sub_article_arr[num] == 'but') {
            sub_article_arr.splice(num, 1);
        }
        //else if (sub_article_arr[num + 1] == 'a' || sub_article_arr[num + 1] == 'an' || sub_article_arr[num + 1] == 'the' || sub_article_arr[num + 1] == 'and' || sub_article_arr[num + 1] == 'or' || sub_article_arr[num + 1] == 'but') {
        //    sub_article_arr.splice(num, 1);
        //}
    }




    //console.log('sub_article_arr2');
    //console.log(sub_article_arr);
    Array.prototype.push.apply(arr, sub_article_arr);
    console.log('------------------------------------------');
    console.log('Now the article is');
    var outsty = ''
    for (var i = 0; i < arr.length; i++) {
        outsty += arr[i];
        outsty += " ";

    }
    console.log(outsty);


    total_words = arr.length;
    //console.log('total_words');
    //console.log(total_words);
    
    for (var j = 0; j < sub_article_arr.length - 1; j++) {
        var sb = sub_article_arr[j] + " " + sub_article_arr[j + 1];
        var temp = sub_article_arr[j] + sub_article_arr[j + 1];
        //console.log("=====" + sb);
        for (var i = 0; i < abc.length; i++) {
            if (abc[i] == temp) {
                //console.log(abc[i] + "=====" + sb);
                sub_article_arr[j] = temp;
                sub_article_arr[j + 1] = ""
                number++;
                //console.log(sub_article_arr);

            }
        }
    }
    total_words2 = arr.length - number;

  

    for (i = 0; i < sub_article_arr.length; i++) {
        trie.insert(sub_article_arr[i]);
    }

    //console.log(trie);
    //console.log(trie.TrieNode);

    var map = {}
    trie.preTraversal(function (node, str) {
        if (node.isEnd) {
            map[str] = node.numEnd
        }
    })

    //console.log(map);


    //cite algorithm from here
    var map1 = {};
    for (var k in map) {
        if (map[k] != 0) {
            if (map1[companies_table[k]] == undefined) {
                map1[companies_table[k]] = map[k];

            }
            else {
                map1[companies_table[k]] += map[k];
            }
        }
    }

    //console.log(map1);

    console.log('------------------------------------------');
    console.log("Company, Hit Count, Relevance");

    //var total_words = arr.length;
    //cite algorithm from here
    var Total_Hit = 0;
    for (var j in map1) {
        for (var i = 0; i < companies_table_new.length; i++) {
            if (j == companies_table_new[i]) {
                Total_Hit += map1[j];
                console.log(j.replace("\r","") + ", " + map1[j] + ", " + Math.round(map1[j] / total_words * 10000) / 100.00 + "%");
            }
        }
    }



    console.log("Total, " + Total_Hit + ", " + Math.round(Total_Hit / total_words * 10000) / 100.00 + "%");
    console.log("Total words: " + total_words);
    //console.log("Total words(If you look a two words company as one word): " + total_words2);
    if (yesorno == "y") {
        
        break;
    }
}

