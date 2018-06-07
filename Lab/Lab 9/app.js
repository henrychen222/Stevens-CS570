'use strict';
var fs = require("fs");

var input = fs.readFileSync('infile.dat', "utf8");
//console.log("SSSSSS" + input);
var input_arr = input.split("\n");
//console.log("SSSSSS" + input_arr);
var nodes_edge_num = input_arr[1];
var nodes_num = input_arr[1].split(" ")[0];
var edges_num = input_arr[1].split(" ")[1];
//console.log( nodes_num);
//console.log("SSSSSS" + input_arr);
var ap = input_arr[2].split(" ")[0];
var bp = input_arr[2].split(" ")[1];

//console.log("SSSSSS" + ap);
//console.log("SSSSSS" + bp);
/*var mapping = input_arr*/;

//console.log("SSSSSS" + mapping);



//数据结构 邻接链表-顶点
function Vertex() {
    if (!(this instanceof Vertex))
        return new Vertex();
    this.color = this.WHITE; //初始为 白色
    this.pi = null; //初始为 无前驱
    this.d = this.INFINITY; //初始为 无穷大
    this.edges = null; //由顶点发出的所有边
    this.value = null; //节点的标识
    this.data = null; //节点的数据
    this.incoming = 0; //节点的入度
}
Vertex.prototype = {
    constructor: Vertex,
    WHITE: 'white', //白色
    GRAY: 'gray', //灰色
    BLACK: 'black', //黑色
    INFINITY: null, //d 为 null 时表示无穷大
}

//数据结构 邻接链表-边
function Edge() {
    if (!(this instanceof Edge))
        return new Edge();
    this.index = null; //边所依附的节点的位置
    this.sibling = null;
    this.w = null; //保存边的权值
}

//数据结构 图-G
function Graph() {
    if (!(this instanceof Graph))
        return new Graph();
    this.graph = [];
    this.dict = {}; //字典 用来映射标节点的识符和数组中的位置
}
Graph.prototype = {
    constructor: Graph,
    //这里加进来的已经具备了边的关系
    addNode: function (node) {
        this.graph.push(node);
    },
    getNode: function (index) {
        return this.graph[index];
    },
    //创建图的 节点
    initVertex: function (vertexs) {
        //创建节点并初始化节点属性 value
        for (let value of vertexs) {
            let vertex = Vertex();
            vertex.value = value.value;
            vertex.data = value.data;
            this.graph.push(vertex);
        }
        //初始化 字典
        for (let i in this.graph) {
            this.dict[this.graph[i].value] = i;
        }
    },
    //建立图中 边 的关系
    initEdge: function (edges) {
        for (let field in edges) {
            let index = this.dict[field]; //从字典表中找出节点在 graph 中的位置
            let vertex = this.graph[index]; //获取节点
            vertex.edges = createLink(0, edges[field].length, edges[field], this.dict, this.graph);
        }
    }
}

//创建链表，返回链表的第一个节点
function createLink(index, len, edges, dict, vertexs) {
    if (index >= len) return null;
    let edgeNode = Edge();
    edgeNode.index = dict[edges[index].id]; //边连接的节点 用在数组中的位置表示 参照字典
    vertexs[edgeNode.index].incoming = vertexs[edgeNode.index].incoming + 1; //设置节点的入度
    edgeNode.w = edges[index].w; //边的权值
    edgeNode.sibling = createLink(++index, len, edges, dict, vertexs); //通过递归实现 回溯
    return edgeNode;
}

var vertexs = [
    //,{ value: 'e', data: 'EE' }, { value: 'f', data: 'FF' },
    //{ value: 'g', data: 'GG' }, { value: 'h', data: 'HH' },
    //{ value: 'i', data: 'II' }
];

for (var i = 0; i < nodes_num; i++) {
    vertexs.push({ value: i, data: i })
}
//var vertexs = [{ value: '0', data: '0' }, { value: '1', data: '1' },
//{ value: '2', data: '2' }, { value: '3', data: '3' }
////,{ value: 'e', data: 'EE' }, { value: 'f', data: 'FF' },
////{ value: 'g', data: 'GG' }, { value: 'h', data: 'HH' },
////{ value: 'i', data: 'II' }
//];


var edges = {
    //0: [{ id: '2', w: 1 }, { id: '3', w: 1 }],
    //1: [{ id: '2', w: 1 }, { id: '3', w: 1 }],
    //0: [], 1: [],
    //2: [],
    //d: [],
    //e: [],
    //f: [{ id: 'i', w: 1 }],
    //g: [{ id: 'f', w: 1 }, { id: 'h', w: 1 }],
    //h: [{ id: 'i', w: 1 }],
    //i: []
}

for (var i = 0; i < nodes_num; i++) {

    edges[i] = [];
    //edges[1] = [];
    //edges[2] = [];
}


var edges_num1 = edges_num + 2
//console.log("daaa" + edges_num1);
//console.log(input_arr);
//console.log(input_arr[2].split(" ")[0]);
//console.log(input_arr[2].split(" ")[1]);

//parseInt("22.5");

for (var i = 2; i < input_arr.length; i++) {
    var a1 = input_arr[i].split(" ")[0];
    var a2 = parseInt(input_arr[i].split(" ")[1]);

    edges[a1].push({ id: a2, w: 1 });
    //console.log(a1);
    //console.log("a2");
    //console.log(a2);
}

//var nodes_num = input_arr[1].split(" ")[0];
//var edges_num = input_arr[1].split(" ")[1];



//console.log(edges[0]);
//edges[0].push({ id: '2', w: 1 });
//edges[0].push({ id: '3', w: 1 });
//edges[1].push({ id: '2', w: 1 });
//edges[1].push({ id: '3', w: 1 });
//edges[2].push({ id: '3', w: 1 });


//kahn算法
function kahn(g) {
    let s = []; //用于存放入度为0的顶点
    let l = []; //用来存放已经排好序的顶点
    //初始化set 将图中所有入度为0的节点加入到set中
    for (let v of g.graph) {
        if (v.incoming == 0)
            s.push(v);
    }
    while (s.length > 0) {
        let u = s.shift();
        l.push(u);
        if (u.edges == null) continue;
        let sibling = u.edges;
        while (sibling != null) {
            let index = sibling.index;
            let n = g.getNode(index);
            n.incoming = n.incoming - 1; //删除边
            if (n.incoming == 0) s.push(n); //入度为0的放入s
            sibling = sibling.sibling;
        }
    }
    return l;
}

function kahn2(g) {
    let s = []; //用于存放入度为0的顶点
    let l = []; //用来存放已经排好序的顶点
    //初始化set 将图中所有入度为0的节点加入到set中
    for (let v of g.graph) {
        if (v.incoming == 0)
            s.push(v);
    }
    while (s.length > 0) {
        let u = s.pop();
        l.push(u);
        if (u.edges == null) continue;
        let sibling = u.edges;
        while (sibling != null) {
            let index = sibling.index;
            let n = g.getNode(index);
            n.incoming = n.incoming - 1; //删除边
            if (n.incoming == 0) s.push(n); //入度为0的放入s
            sibling = sibling.sibling;
        }
    }
    return l;
}

var g = Graph();
g.initVertex(vertexs);
g.initEdge(edges);
var r = kahn(g);

console.log("This is the first Topological Sort");
//console.log(r);
for (var i = 0; i < r.length; i++) {
    //console.log(r[i].data);
    console.log(r[i].value);
}
//console.log(r[0].data);



//var vertexs = [{ value: 'a', data: '0' }, { value: 'b', data: '1' },
//{ value: 'c', data: '2' }, { value: 'd', data: '3' }
//    //,{ value: 'e', data: 'EE' }, { value: 'f', data: 'FF' },
//    //{ value: 'g', data: 'GG' }, { value: 'h', data: 'HH' },
//    //{ value: 'i', data: 'II' }
//];

//var edges = {
//    a: [{ id: 'c', w: 1 }, { id: 'd', w: 1 }],
//    b: [{ id: 'c', w: 1 }, { id: 'd', w: 1 }],
//    c: [{ id: 'd', w: 1 }],
//    //d: [],
//    //e: [],
//    //f: [{ id: 'i', w: 1 }],
//    //g: [{ id: 'f', w: 1 }, { id: 'h', w: 1 }],
//    //h: [{ id: 'i', w: 1 }],
//    //i: []
//}

//kahn算法


function kahn2(g) {
    let s = []; //用于存放入度为0的顶点
    let l = []; //用来存放已经排好序的顶点
    //初始化set 将图中所有入度为0的节点加入到set中
    for (let v of g.graph) {
        if (v.incoming == 0)
            s.push(v);
    }
    while (s.length > 0) {
        let u = s.pop();
        l.push(u);
        if (u.edges == null) continue;
        let sibling = u.edges;
        while (sibling != null) {
            let index = sibling.index;
            let n = g.getNode(index);
            n.incoming = n.incoming - 1; //删除边
            if (n.incoming == 0) s.push(n); //入度为0的放入s
            sibling = sibling.sibling;
        }
    }
    return l;
}

var g1 = Graph();
g1.initVertex(vertexs);
g1.initEdge(edges);
var r2 = kahn2(g1);
console.log("This is the second Topological Sort");
//console.log(r);
for (var i = 0; i < r2.length; i++) {
    console.log(r2[i].data);

}
