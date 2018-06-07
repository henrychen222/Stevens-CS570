const fs = require("fs");

function isAlphabet(CharacterCode) {
    if (CharacterCode >= 65 && CharacterCode <= 90) {
        return true;
    } else if (CharacterCode >= 97 && CharacterCode <= 122) {
        return true;
    }
    return false;
}

function decodeCaesersCipher(encodeInputMessage) {
    let outputDecodeMessage;
    let decodeKey = 5;

    for (let i = 0; i < String(encodeInputMessage).length; i++) {
        if (i % 3 == 0 && i != 0) {
            decodeKey = decodeKey % 26 + 2;

        }

        let encodedCharacter = String(encodeInputMessage).charCodeAt();

        if (isAlphabet(encodedCharacter)) {
            let decodedCharacter = encodedCharacter - decodeKey;

            if (decodedCharacter < 65) {
                decodedCharacter = 90 - 65 + decodedCharacter + 1;
            } else if (decodedCharacter < 97) {
                decodedCharacter = 122 - 97 + decodedCharacter + 1;
            }
            outputDecodeMessage += String.fromCharCode(decodedCharacter);
        } else {
            outputDecodeMessage += String.fromCharCode(decodedCharacter);
        }
    }
    return String(outputDecodeMessage);
}

// function simplify_text(str) {
//     // if(!str) throw "no string is provided";
//     // if(typeof str !== 'string') throw 'not a string';
//     return str.toLowerCase().replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, ' ').trim();
// }


//prompt user and get the input file name
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter file path + name: ", (inputFile) => {
    //console.log("File name entered", inputFile);

    //read input file containing Caeser-Cipher encoded text
    fs.readFile(inputFile, (err, encodeInputMessage) => {
        if (err) {
            console.error("Error in reading File: ", err);
        } else {
            console.log("Read from file: \n\n", String(encodeInputMessage));


            //decode encodedInputMessage use function
            let outputDecodeMessage = decodeCaesersCipher(encodeInputMessage);

            //write outputDecodeMessage to file
            fs.writeFile("solution.txt", outputDecodeMessage, function(err) {
                if (err) {
                    return console.log("\nError writing to file");
                }

                //get the decoded content 
                console.log(fs.readFileSync("solution.txt", "utf8"));

            });
        }
    });

    
    rl.close();
});




