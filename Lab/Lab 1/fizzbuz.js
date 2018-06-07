//this for loop is designed by: Yongchang Yao
for (var i = 74; i <= 291; i++) {
    //this if-else structure part is designed by: Wei Chen
    if (i % 3 == 0) {
        if (i % 5 == 0) {
            console.log("BuzzFizz");
        }
        console.log("Buzz");
    } else if (i % 5 == 0) {
        console.log("Fizz");
    } else
        console.log(i);
}