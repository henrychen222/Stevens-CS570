//Get series
function sequence(length, first) {
    first = first || 0;
    var arr = [];
    for (var i = 0; i < length; i++)
        arr.push(first + i);
    return arr;
}

//Judgement function
function Buzzfizz(num) {

    for (var i = 0; i < num.length; i++) {
        //this if-else structure part is designed by: Wei Chen
        if (num[i] % 3 == 0) {
            if (num[i] % 5 == 0) {
                console.log("BuzzFizz");
            }
            console.log("Buzz");
        } else if (num[i] % 5 == 0) {
            console.log("Fizz");
        } else
            console.log(num[i]);
    }
}
//The sequence consisting of the numbers between 10 and 250. So length is 250 - 10 + 1, first is 10
Buzzfizz(sequence(250 - 10 + 1, 10));

