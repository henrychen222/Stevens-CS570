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



//���ݽṹ �ڽ�����-����
function Vertex() {
    if (!(this instanceof Vertex))
        return new Vertex();
    this.color = this.WHITE; //��ʼΪ ��ɫ
    this.pi = null; //��ʼΪ ��ǰ��
    this.d = this.INFINITY; //��ʼΪ �����
    this.edges = null; //�ɶ��㷢�������б�
    this.value = null; //�ڵ�ı�ʶ
    this.data = null; //�ڵ������
    this.incoming = 0; //�ڵ�����
}
Vertex.prototype = {
    constructor: Vertex,
    WHITE: 'white', //��ɫ
    GRAY: 'gray', //��ɫ
    BLACK: 'black', //��ɫ
    INFINITY: null, //d Ϊ null ʱ��ʾ�����
}

//���ݽṹ �ڽ�����-��
function Edge() {
    if (!(this instanceof Edge))
        return new Edge();
    this.index = null; //���������Ľڵ��λ��
    this.sibling = null;
    this.w = null; //����ߵ�Ȩֵ
}

//���ݽṹ ͼ-G
function Graph() {
    if (!(this instanceof Graph))
        return new Graph();
    this.graph = [];
    this.dict = {}; //�ֵ� ����ӳ���ڵ��ʶ���������е�λ��
}
Graph.prototype = {
    constructor: Graph,
    //����ӽ������Ѿ��߱��˱ߵĹ�ϵ
    addNode: function (node) {
        this.graph.push(node);
    },
    getNode: function (index) {
        return this.graph[index];
    },
    //����ͼ�� �ڵ�
    initVertex: function (vertexs) {
        //�����ڵ㲢��ʼ���ڵ����� value
        for (let value of vertexs) {
            let vertex = Vertex();
            vertex.value = value.value;
            vertex.data = value.data;
            this.graph.push(vertex);
        }
        //��ʼ�� �ֵ�
        for (let i in this.graph) {
            this.dict[this.graph[i].value] = i;
        }
    },
    //����ͼ�� �� �Ĺ�ϵ
    initEdge: function (edges) {
        for (let field in edges) {
            let index = this.dict[field]; //���ֵ�����ҳ��ڵ��� graph �е�λ��
            let vertex = this.graph[index]; //��ȡ�ڵ�
            vertex.edges = createLink(0, edges[field].length, edges[field], this.dict, this.graph);
        }
    }
}

//����������������ĵ�һ���ڵ�
function createLink(index, len, edges, dict, vertexs) {
    if (index >= len) return null;
    let edgeNode = Edge();
    edgeNode.index = dict[edges[index].id]; //�����ӵĽڵ� ���������е�λ�ñ�ʾ �����ֵ�
    vertexs[edgeNode.index].incoming = vertexs[edgeNode.index].incoming + 1; //���ýڵ�����
    edgeNode.w = edges[index].w; //�ߵ�Ȩֵ
    edgeNode.sibling = createLink(++index, len, edges, dict, vertexs); //ͨ���ݹ�ʵ�� ����
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


//kahn�㷨
function kahn(g) {
    let s = []; //���ڴ�����Ϊ0�Ķ���
    let l = []; //��������Ѿ��ź���Ķ���
    //��ʼ��set ��ͼ���������Ϊ0�Ľڵ���뵽set��
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
            n.incoming = n.incoming - 1; //ɾ����
            if (n.incoming == 0) s.push(n); //���Ϊ0�ķ���s
            sibling = sibling.sibling;
        }
    }
    return l;
}

function kahn2(g) {
    let s = []; //���ڴ�����Ϊ0�Ķ���
    let l = []; //��������Ѿ��ź���Ķ���
    //��ʼ��set ��ͼ���������Ϊ0�Ľڵ���뵽set��
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
            n.incoming = n.incoming - 1; //ɾ����
            if (n.incoming == 0) s.push(n); //���Ϊ0�ķ���s
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

//kahn�㷨


function kahn2(g) {
    let s = []; //���ڴ�����Ϊ0�Ķ���
    let l = []; //��������Ѿ��ź���Ķ���
    //��ʼ��set ��ͼ���������Ϊ0�Ľڵ���뵽set��
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
            n.incoming = n.incoming - 1; //ɾ����
            if (n.incoming == 0) s.push(n); //���Ϊ0�ķ���s
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
