function seq(length,first){
    first = first;
    
    var arr = [];

    for (let i = 0; i<length; i++) {

        arr.push(first + i);
    }

    return arr;
}


function FizzBuzzer(num){
   
    for (let i = 0; i<num.length;i++) {
        //this if-else structure part is designed by: Wei Chen
        if (num[i]% 3 == 0) {
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


FizzBuzzer(seq(250-10+1,10));




