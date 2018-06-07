//Check function

function isAlphabet(characterCode) {
    if (characterCode >= 65 && characterCode <= 90) {
        return true;
    }
    else if (characterCode >= 97 && characterCode <= 122) {
        return true;
    }
    return false
}

//function body


function rot5(str) {
    var str1 = [];
    let key = 3
  
    for (var i = 0; i < str.length; i++) {
        if (i % 3 == 0)
            key = (key + 2) % 26;
        var num = str[i].charCodeAt();
        
        if (isAlphabet(num)){
            if (num - key >= 65 && num <= 90)
                num = num - key;
            else if (num - key < 65)
                num = 91 - (65 - (num - key));
            else if (num - key >= 97 && num <= 122)
                num = num - key;
            else if (num - key < 97)
                num = 123 - (97 - (num - key));

            str1.push(String.fromCharCode(num));
            if ((i + 1) % 3 == 0)
                str1.push(" ");
        }
    }
        return str1.join("");
}





//Test function
//console.log(rot5('UVW'));
//console.log(rot5('XYZ'));
//console.log(rot5('ABC'));
//console.log(rot5('DEF'));
console.log(rot5('ABCDEXY'));
console.log(rot5(' ABCD EXY'));


//Promet from input.txt
var fs = require('fs');
var file_info = fs.readFileSync("input.txt", "utf8");
console.log(file_info);

//decrypt the message
console.log(rot5(file_info));
//write the file
console.log("------------------Going to write the decrypt message to solution.txt------------------" + "\n");
fs.writeFileSync('solution.txt', rot5(file_info), "utf8");


//read the file content after decrypting
var solution_content = fs.readFileSync("solution.txt", "utf8");
console.log(solution_content);



  

//Old codes, abandon

//read the file and save into the 
//var fs = require("fs");
//var path = require("path");
//var util = require("util");

//var file_info;
//console.log(file_info);
//fs.readFile(path.join(__dirname, "input.txt"), 'utf8', function (err, data) {
    //if (err) {
    //    console.log(err);
    //    process.exit(1);
    //}
    //format the file 
    //file_info = util.format(data);
    //console.log(file_info);
//});



//decrypt the message
//console.log(rot5(file_info));

//write the file
//console.log("Going to write the decrypt message to solution.txt" + "\n");
//fs.writeFile('solution.txt', rot5(file_info), function (err) {
    // (err) {
        //return console.error(err);
    //}
//});
