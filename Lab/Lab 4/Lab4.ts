class Vector<T> implements Iterable<T> {
    private arr: T[];
    private length: number = 0;

    private get capacity() { return this.arr.length; }

    constructor(capacity = 0) {
        this.arr = new Array(capacity);
    }

    public resize(length: number) {
        if (length > this.capacity)
            this.reserve(length);

        this.length = length;
    }

    public reserve(capacity: number) {
        if (this.capacity >= capacity) return;
        const copy = new Array(capacity * 2);
        for (let i = 0; i < this.length; i++)
            copy[i] = this.arr[i];
        delete this.arr;
        this.arr = copy;
    }

    public get(index: number): T {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) return undefined;
        return this.arr[index];
    }

    public set(index: number, value: T) {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) throw new Error("index exceeds length");
        this.arr[index] = value;
    }

    public push(value: T) {
        if (this.length == this.capacity)
            this.reserve(this.length + 1);
        this.arr[this.length] = value;
        this.length++;
        console.log("Pushed", value, "--length:", this.length, "--capacity:", this.capacity);
    }

    public pop(): T {
        this.length--;
        return this.arr[this.length - 1];
    }

    public insert(index: number, value: T) {
        if (this.length == this.capacity)
            this.reserve(this.length + 1);
        for (let i = this.length; i >= index; i--)
            this.arr[i] = this.arr[i - 1];
        this.length++;
        this.arr[index] = value;
    }

    public *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++)
            yield this.arr[i];
    }
}


function output_list(list: Iterable<any>) {
    // output each item in the list
    for (let elem of list)
        console.log(elem);
}


const vec = new Vector<number>();
//first you need to resize the vector 
vec.resize(11);
vec.set(0, 10);
vec.set(1, 20);
vec.set(2, 30);
vec.set(3, 40);
vec.set(4, 50);
vec.set(5, 60);
vec.set(6, 70);
vec.set(7, 80);
vec.set(8, 90);
vec.set(9, 100);
vec.set(10, 110);

console.log("---------Get one element--------------------------------------------");
//you can get any element here
console.log(vec.get(3));
console.log();

console.log("---------Now going to push a element--------------------------------");
vec.push(940822);
output_list(vec);
console.log();

console.log("---------Now going to pop-------------------------------------------");
vec.pop();
output_list(vec);
console.log();

console.log("---------Now going to insert a element in a specific position-------");
//you can insert to any position
vec.insert(10, 12345678);
output_list(vec);


