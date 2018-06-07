var fs = require('fs');
var prompt = require('prompt');
var prompt = require('prompt-sync')();
//Initial
var players = null;
var line = null;
var length = null;
//Arry like 1 2 3 4...
var firstarr = [];
//board row a like "   |"
var row1 = [];
//board row b like "~~~~"
var row2 = [];
//rows internal
var row1in = [];
//board vis
var arr = [];
//board internal
var arrin = [];
//Chessboardvis 2D arr
var board = [];
//Chessboardin 2D arr
var boardnow = [];
var boardnow2 = [];
var boardin = [];
var boardinside = [];
//player's info
var playername = [];
var playerletter = [];
var playernamecheck = [];
var playn = [];
var playl = [];
//move
var ynum = null;
var xnum = null;
var xreal = null;
var yreal = null;


//About print
var separator = null;
var board = [];
var first1 = null;

var abandon = false;
var bigCounter = 0;
//Ask function
var counter = 0;
var currentPlayer = null;
var currentletter = null;
var currentMove = [];
var move = [];
var goodMove = false;
var start = true;
var repeatPlay = false;
var playAgain = null;
//About check win
var winner = false;
var noWinner = false;
var rowWinner = false;
var colWinner = false;
var diagWinner1 = false;
var diagWinner2 = false;
var roww = 0;
var colw = 0;
var digw1 = 0;
var digw2 = 0;
var zeroarr = false;
//option
var savegame = false;
var regame = false;
var quitgame = false;
//save or no
var son = null;

//Initial function
function initial() {
    var players = null;
    var line = null;
    var length = null;
    //Arry like 1 2 3 4...
    var firstarr = [];
    //board row a like "   |"
    var row1 = [];
    //board row b like "~~~~"
    var row2 = [];
    //rows internal
    var row1in = [];
    //board vis
    var arr = [];
    //board internal
    var arrin = [];
    //Chessboardvis 2D arr
    var board = [];
    //Chessboardin 2D arr
    var boardin = [];
    //player's info
    var playername = [];
    var playerletter = [];
    var playernamecheck = [];
    var playn = [];
    var playl = [];
    var boardnow = [];
    var boardnow2 = [];
    var boardin = [];
    var boardinside = [];
    //Move
    var ynum = null;
    var xnum = null;
    var xreal = null;
    var yreal = null;



    //About print
    var separator = null;
    var board = [];
    var first1 = null;

    var abandon = false;
    var bigCounter = 0;
    //Ask function
    var counter = 0;
    var currentPlayer = null;
    var currentletter = null;
    var currentMove = [];
    var move = [];
    var goodMove = false;
    var start = true;
    var repeatPlay = false;
    var playAgain = null;
    //About check win
    var winner = false;
    var noWinner = false;
    var rowWinner = false;
    var colWinner = false;
    var diagWinner1 = false;
    var diagWinner2 = false;
    var roww = 0;
    var colw = 0;
    var digw1 = 0;
    var digw2 = 0;
    var zeroarr = false;
//Options
    var savegame = false;
    var regame = false;
    var quitgame = false;
    //save or no
    var son = null;
}
//function to ask new game or saved game
function saveorno() {
    do {
        console.log("You want a new game or  a saved game? Please input 'n' or 's'")
        son = prompt();
        if (son == "n") {
            boardnow = loadi();
            break;
        }
        else if (son == "s") {
            console.log("Now load saved game " + length + " legnthsave.txt");
            boardnow = load();
            break;
        }


    } while (son != "n" || son != "s");
}




//Define rules~
function rule() {
    console.log("The area of Chessboard like X*X");
    console.log("Please input how many the X is?");
    length = prompt();
    console.log("The side of chessboard is " + length);
    if (length > 999) {
        
        throw "The number is too big!";
    }
    console.log("Please input how many players in this game?");
    players = prompt();
    if (players > 26) {
        
        throw "There are too many players!";
    }
    console.log("The palyer who has X chess pieces in line will win.");
    console.log("Please input how many the X is?");
    line = prompt();
    //if (line > length) {
        
    //    throw "The Cheesboard seems too small!";
    //}

    if (players > ((length * length - line) / (line - 1))) {
        
        throw "It seems no one can win this game~";
    }
}

//Get player's name and check weather it is vaild.
function playername1() {

    var repeat = false;
    for (var i = 0; i < players; i++) {
        console.log("Player " + i + " please input yourname:");
        playername[i] = prompt();
        for (var j = 0; j < playernamecheck.length; j++) {
            if (playername[i] == playernamecheck[j]) {
                repeat = true;
                console.log("Player " + i + " this name is occupied, please enter another name.");
                i--;
                break;
            }
        }
        if (!repeat)
            playernamecheck.push(playername[i]);
    }
    return playernamecheck;
}

//Get which symbol the player should use
function playerletter1() {

    for (var i = 0; i < players; i++) {
        if (i == 0) {
            playerletter[i] = "X";
        }
        else if (i == 1) {
            playerletter[i] = "O";
        }
        else if (i >= 2 && i <= 15) {
            playerletter[i] = String.fromCharCode(i - 2 + 65);
        }
        else if (i >= 16 && i <= 23) {
            playerletter[i] = String.fromCharCode(i - 1 + 65);
        }
        else if (i == 24) {
            playerletter[i] = "Y";
        }
        else if (i == 25) {
            playerletter[i] = "Z";
        }
    }
    return playerletter;
}



//Get the firstline of the Cheesboard
function firstline(first) {
    var first = 1;
    for (var i = 0; i < length; i++) {
        if (i < 10) {
            firstarr.push("   ");
            firstarr.push(first + i);
            firstarr.push("  ");
        }
        else {
            firstarr.push("  ");
            firstarr.push(first + i);
            firstarr.push("  ");
        }

    }
    return firstarr.join("");
}


//function row A of each rows, just like 
function rowa() {

    for (var j = 0; j < length; j++) {
        if (j < 9) {
            row1.push("     ");
            row1.push("|");
        }
        else {
            row1.push("     ");
            row1.push("|");
        }

    }
    return row1;
}

//function row A internal of each rows
function rowain() {

    for (var j = 0; j < length; j++) {

        row1in.push(" ");


    }
    return row1in;
}

//function  row B of each rows
function rowb() {

    for (var j = 0; j < length; j++) {

        if (j < 9)
            row2.push(" ----+");
        else
            row2.push("-----+");

    }
    return row2.join("");

}

//function of cheesboard_vis
function sequence() {

    var arrrow1 = rowa();
    for (var k = 0; k < length; k++) {
        if (k < 9) {
            arr[k] = ((k + 1) + " " + arrrow1.join(""));
        }
        else {
            arr[k] = ((k + 1) + arrrow1.join(""));
        }

    }
    return arr;
}

    function printboard() {
        console.log("The Chessboard now like above£º");
        console.log("");
        console.log(first1);
        for (var m = 0; m < length; m++) {
            console.log(board[m]);
            console.log(separator);
        }
    }


//This is the move 
function askMove() {
    var id = counter;
    //if (id == 0) {
    //    id = 26;
    //}
    playernamenow = playn[counter];
    playerletternow = playl[counter];
    currentPlayer = playernamenow;

    console.log("Hi " + " Player " + (counter + 1) + " " + playernamenow);
    console.log("Your symbol is " + playerletternow);
    console.log("Which grid you want to go ?");
    console.log("Please input row coordinate = ?   \nYou can input's'to save your game, \ninput 'r' to resetGame, and input 'q' to quit game.");
    ynum = prompt();
    console.log("Please input column coordinate = ?   \nYou can input's'to save your game, \ninput 'r' to resetGame, and input 'q' to quit game.");
    xnum = prompt();
    //Depends on what inputed
    if (ynum == "s" || xnum == "s") {
        savegame = true;

    }
    else if (ynum == "r" || xnum == "r") {
        console.log("Do you want to hava another game?(n/y)");
        var rg = prompt().toLowerCase();
        if (rg == 'y') {
            console.log("Restart game");
            regame = true;
        }

    }
    else if (ynum == "q" || xnum == "q") {
        console.log("Do you want to quit game?(n/y)");
        var rq = prompt().toLowerCase();
        if (rq == 'y') {
            console.log("Quit game");
            quitgame = true;
        }

    }
    else if ((isNaN(xnum)) == false && (isNaN(ynum)) == false) {
        var xint = parseInt(xnum, 10);
        var yint = parseInt(ynum, 10);
        //console.log(playerletternow);
        if (boardnow[yint - 1][xint - 1] != " ") {
            console.log("This point is occupied, please try another one!");
            counter--;
        }
        else {
            boardnow[yint - 1][xint - 1] = playerletternow;
        }

    }
    else
        console.log("Your input is wrong, please try again!");
        //counter--;   

    return boardnow;
}

//////////////////
function testjudge() {
    
    if (boardnow[0][0] == boardnow[0][1] && boardnow[0][1] == boardnow[0][2] && boardnow[0][0] !=" ") {
        //console.log("win");
        //== boardnow[0][1] == boardnow[0][2] 
    }
    
}


//There are the check founctions //////////////////////////////////////////////////////////////

function rowWinner1() {    
    var zeroarrin = false;
    
    // boardnow[0][0] = 1;
    // boardnow[0][1] = 1;
    // boardnow[0][2] = 1;


    for (roww = 0; roww < length; roww++) {
        //check  row [roww]
        if (rowWinner == false) {
            for (var i = 0; i < length - line + 1; i++) {
                //check num == length - line + 1 do the num[i] check now!
                if (rowWinner == false); {
                    for (var j = 0; j < line - 1; j++) {
                        for (var k = 0; k < length; k++) {
                            if (boardnow[roww][k] != " ") {
                                break;
                            }
                            else if (k == length - 1) {
                                zeroarrin = true;
                            }
                        }
                        if (boardnow[roww][i + j] != boardnow[roww][i + j + 1]) {
                            break;
                        }
                        else if (j == line - 2 && zeroarrin == false) {
                            //come to the final
                            rowWinner = true;
                            console.log("Some one win");
                            break;

                        }
                    }
                }

            }
        }

    }

    return rowWinner;
}


function colWinner1() {
    var zeroarrin = false;
    
    for (colw = 0; colw < length; colw++) {
        //check  row [roww]
        if (colWinner == false) {
            for (var i = 0; i < length - line + 1; i++) {
                //check num == length - line + 1 do the num[i] check now!
                if (colWinner == false); {
                    for (var j = 0; j < line - 1; j++) {
                        for (var k = 0; k < length; k++) {
                            if (boardnow[k][colw] != " ") {
                                break;
                            }
                            else if (k == length - 1) {
                                zeroarrin = true;
                            }
                        }
                        if (boardnow[i + j][colw] != boardnow[i + j + 1][colw]) {
                            break;
                        }
                        else if (j == line - 2 && zeroarrin == false) {
                            //come to the final
                            colWinner = true;
                            console.log("Some one win");
                            break;

                        }
                    }
                }

            }
        }

    }

    return colWinner;
}

function diagWinnera() {
    var zeroarrin = false;

    for (var digw1 = 0; digw1 < length - digw1; digw1++) {
        //check  row [roww]
        if (diagWinner1 == false) {
            for (var i = 0; i < length - line + 1; i++) {
                //check num == length - line + 1 do the num[i] check now!
                if (diagWinner1 == false); {
                    for (var j = 0; j < line - 1; j++) {
                        //for (var k = 0; k < length; k++) {
                        //    if (boardnow[i + j + digw1 + k][i + j + k] != " "){
                        //        break;
                        //    }
                        //    else if (k == length - 1) {
                        //        zeroarrin = true;
                        //    }
                        //}
                        if (boardnow[i + j + digw1][i + j] != boardnow[i + j + digw1 + 1][i + j + 1] || boardnow[i + j + digw1][i + j]==0) {
                            break;
                        }
                        else if (j == line - 2 && zeroarrin == false) {
                            //come to the final
                            diagWinner1 = true;
                            console.log("Some one win");
                            break;

                        }
                    }
                }

            }
        }

    }

    return diagWinner1;
}

function diagWinnerb() {
    var zeroarrin = false;

    for (digw2 = 0; digw2 < length - digw2; digw2++) {
        //check  row [roww]
        if (diagWinner2 == false) {
            for (var i = 0; i < length - line + 1; i++) {
                //check num == length - line + 1 do the num[i] check now!
                if (diagWinner2 == false); {
                    for (var j = 0; j < line - 1; j++) {
                        for (var k = 0; k < length; k++) {
                            if (boardnow[i + j + k][i + j + digw1 + k] != " ") {
                                break;
                            }
                            else if (k == length - 1) {
                                zeroarrin = true;
                            }
                        }
                        if (boardnow[i + j][i + j + digw1] != boardnow[i + j + 1][i + j + digw1 + 1]) {
                            break;
                        }
                        else if (j == line - 2 && zeroarrin == false) {
                            //come to the final
                            diagWinner2 = true;
                            console.log("Some one win");
                            break;

                        }
                    }
                }

            }
        }

    }

    return diagWinner2;
}

function rowcheck1() {
    var xinrr = parseInt(xnum, 10);
    var yinrr = parseInt(ynum, 10);

    xreal1 = xinrr - 1;
    yreal1 = yinrr - 1;

    var rowcheck1 = 1;
    while ((xreal1 >= 1) && (boardnow[yreal1][xreal1] == boardnow[yreal1][xreal1 - 1])) {
        rowcheck1 = rowcheck1 + 1;
        xreal1--;
        //yreal1--;
    }
    xreal12 = xinrr - 1;
    yreal12 = yinrr - 1;
    while ((xreal12 < length - 1) && (boardnow[yreal12][xreal12] == boardnow[yreal12][xreal12 + 1])) {
        rowcheck1 = rowcheck1 + 1;
        xreal1++;
        //yreal1++;
    }
  
    if (rowcheck1 == line) {
        rowWinner = true;
    } else {
        rowWinner = false;
    }
    
}


function colcheck1() {
    var xinrr = parseInt(xnum, 10);
    var yinrr = parseInt(ynum, 10);

    xreal1 = xinrr - 1;
    yreal1 = yinrr - 1;

    var colcheck1 = 1;
    while ((yreal1 >= 1) && (boardnow[yreal1][xreal1] == boardnow[yreal1 - 1][xreal1])) {
        colcheck1 = colcheck1 + 1;
        //xreal1--;
        yreal1--;
    }
    xreal12 = xinrr - 1;
    yreal12 = yinrr - 1;
    while ((yreal12 < length - 1) && (boardnow[yreal12][xreal12] == boardnow[yreal12 + 1][xreal12])) {
        colcheck1 = colcheck1 + 1;
        //xreal1++;
        yreal1++;
    }

    if (colcheck1 == line) {
        colWinner = true;
    } else {
        colWinner = false;
    }

}



//The diagWinner function may not work well, so find another way





function diagcheck1() {
    var xinrr = parseInt(xnum, 10);
    var yinrr = parseInt(ynum, 10);

    xreal1 = xinrr - 1;
    yreal1 = yinrr - 1;
    
    var diagcheck1 = 1;
    while ((xreal1 >= 1) && (yreal1 >= 1) && (boardnow[yreal1][xreal1] == boardnow[yreal1 - 1][xreal1 - 1])) {
        diagcheck1 = diagcheck1 + 1;
        xreal1--;
        yreal1--;
    }
    xreal12 = xinrr - 1;
    yreal12 = yinrr - 1;
    while ((xreal12 < length - 1) && (yreal12 < length - 1) && (boardnow[yreal12][xreal12] == boardnow[yreal12 + 1][xreal12 + 1])) {
        diagcheck1 = diagcheck1 + 1;
        xreal1++;
        yreal1++;
    }
    //console.log(diagcheck1 + " is check");
    //console.log(line + " is line");
    //console.log(yreal + " is y");
    if (diagcheck1 == line) {
        diagWinner1 = true;
    } else {
        diagWinner1 = false;
    }
    //console.log(diagWinner1 + " is ");
}

        
function diagcheck2() {
    var xinr = parseInt(xnum, 10);
    var yinr = parseInt(ynum, 10);
    
    xreal = xinr - 1;
    yreal = yinr - 1;
    //console.log(xreal + " is x");
    //console.log(yreal + " is y");
    var diagcheck2 = 1;
    while ((xreal <= length - 1) && (yreal >= 1) && (boardnow[yreal][xreal] == boardnow[yreal - 1][xreal + 1])) {
        diagcheck2 = diagcheck2 + 1;
        xreal++;
        yreal--;

    }
    xreal = xinr - 1;
    yreal = yinr - 1;
    while ((xreal >= 1) && (yreal < length - 1) && (boardnow[yreal][xreal] == boardnow[yreal + 1][xreal - 1])) {
        diagcheck2 = diagcheck2 + 1;
        xreal--;
        yreal++;
    }
    if (diagcheck2 == line) {
        diagWinner2 = true;
    } else {
        diagWinner2 = false;
    }
}

function checktie() {
    var tie = false
    var checktie = boardnow;
    var tienum = 0;
    var tienum1 = length * length;
    //console.log(tienum1 + " is tienum1");
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            if (checktie[j][i] != 0) {
                tienum = tienum + 1;
            }
        }
    }
    if (tienum == tienum1) {
        tie = true;
        console.log("It is a tie game !");
        noWinner == true;
    }
   // console.log(tienum + " is tie");
}









////////////////////////////////////////////////////////////////Congrats function
function congrats() {
    if (diagWinner1 === true || diagWinner2 === true) {
        console.log("It is a diagWinner winner!");
        console.log(currentPlayer + " is the winner!");
        winner = true;
    } else if (rowWinner === true) {
        console.log("It is a rowWinner winner!");
        console.log(currentPlayer + " is the winner!");
        winner = true;
    } else if (colWinner === true) {
        console.log("It is a colWinner winner!");
        console.log(currentPlayer + " is the winner!");
        winner = true;
    } else if (counter * bigCounter === length * length) {
        console.log("The table is full!");

        winner = true;
        noWinner = true;
    }
};

//This two functions to get a empty new board
//Get one line of internal board
function rowain() {
    var row1in = new Array();

    for (var j = 0; j < length; j++) {

        row1in.push(" ");

    }




    //console.log(row1in);
    return row1in;
}

//Get whole board of internal board
function sequencein() {
    var arrrow2 = new Array();
    var arrin = new Array();
    arrrow2 = rowain();

    for (var k = 0; k < length; k++) {
        arrin[k] = arrrow2;

    }

    return arrin;
}





////////////////////////////////////////////////////////////////////////////////
//This two functions for printing  current visual board
function printboardnow() {
    
for(i=0;i<length;i++){
    if(i<9){
        boardinside[i] = ((i + 1) + "  " + boardnow[i].join("  |  "));
    }
    else{
        boardinside[i] = ((i + 1)  + boardnow[i].join("  |  "));
    
    }
    
}
return boardinside;

}

function printboardnow1() {
    var boardnow1 = printboardnow()
    console.log("The Chessboard now like above£º");
    console.log("");
    console.log(first1);
    for(i=0;i<length;i++){
        console.log(boardnow1[i] + "  |");
        console.log(separator);
    }
}







////////////////////////////////////////////////////////////////
//Use save & load function to get initial board 
//Save function for initial
function savei() {
    boardnow = sequencein(); 
    var savename = length + "legnthsavei.txt";
    fs.writeFileSync(savename, boardnow, "utf8");
    console.log("The game generating.. named " + length + " legnthsavei.txt");
}

// Load function for initial
function loadi() {
    var loadname = length + "legnthsavei.txt"
    var solution_content = fs.readFileSync(loadname, "utf8");
    var arr = solution_content.split(",");
    var b = [];
    var k = 0;
    var result = [];

    for (var i = 0; i < arr.length; ++i) {
        if (i % length == 0) {
            b = [];
            for (var j = 0; j < length; ++j) {
                if (arr[i + j] == undefined) {
                    continue;
                } else {
                    b[j] = arr[i + j];
                }
            }
            result[k] = b;
            k++;
        }

    }
    return result;
}



////////////////////////////////////////////////////////////////
//Save function
function save() {
    var savename = length + "legnthsave.txt";
    fs.writeFileSync(savename, boardnow, "utf8");
    console.log("The game" + length + " legnthsave.txt saved");
}

// Load function
function load() {
    var loadname = length + "legnthsave.txt"
    var solution_content = fs.readFileSync(loadname, "utf8");
    var arr = solution_content.split(",");
    var b = [];
    var k = 0;
    var result = [];

    for (var i = 0; i < arr.length; ++i) {
        if (i % length == 0) {
            b = [];
            for (var j = 0; j < length; ++j) {
                if (arr[i + j] == undefined) {
                    continue;
                } else {
                    b[j] = arr[i + j];
                }
            }
            result[k] = b;
            k++;
        }

    }
    return result;
}




//Now we hava chessboard and begin to ask player move




function run() {
    console.log("Welcome to Tic-Tac-Toe!");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("When you playing, you can input's'to save your game, \ninput 'r' to resetGame, and input 'q' to quit game.");
    initial();
    while (start == true || regame == true) {
        initial();
        rule();
        playn = playername1();
        playl = playerletter1();
        //Print board's information
        console.log("Now the side length of the board is " + length);
        console.log("You need " + line + " elements linked to win the game! ")
        //Print players' information         
        console.log("Now we have " + players + "players");
        console.log("They are " + playn.join(","));
        console.log("And their symbols are " + playl.join(","));
        //generate board
        separator = rowb();
        board = sequence();
        first1 = firstline(1);
        boardnow = sequencein();
        savei();

        //Ask nwe game or saved game
        saveorno();
        //Print board
        printboardnow1();
        //Game begin

        for (bigCounter = 0; bigCounter < ((length * length) / players); bigCounter++) {
            if (savegame == false && quitgame == false) {
                // && regame == false 
                //Begin to move
                for (counter = 0; counter < players;) {
                    if (savegame == false && quitgame == false) {
                        // && regame == false 

                        if (winner == true || noWinner == true) {
                            //console.log("Game End!");
                            break;
                        }
                        else if (savegame == true) {
                            save();
                            counter--;
                        }
                        else if (quitgame == true) {
                            console.log("Game End!");
                            start = false;
                            regame = false;
                            break;
                        }
                        else if (regame == true) {
                            //console.log("Game restart!");
                            //start = false;
                            regame = true;
                            break;
                        }


                        else {
                            askMove();
                            //Print current board and go on
                            printboardnow1();
                            //console.log(boardnow);
                            //testjudge();
                            //rowWinner1();
                            //colWinner1();
                            rowcheck1();
                            colcheck1();
                            diagcheck1();
                            diagcheck2();
                            //checktie();
                            congrats();
                            counter++;
                        }
                    }
                    
                }
            }


            else if (quitgame == true) {
                console.log("Game End!");
                break;
            }
            else if (regame == true) {
                //console.log("Game restart!");
                regame = true;
                break;
                
            }
            else if (quitgame == true) {
                console.log("Good bye!");
                start = false;
                break;
            }
            
        }



        if (quitgame == true) {
            console.log("Good bye!");
            start = false;
            regame = false;
            break;
        }
        else if (regame == true) {
            //console.log("Game restart!");
            start = false;
            regame = true;
        }
        else if (winner == true || noWinner == true) {
            console.log("Do you want to hava a new game?(n/y)");
            var playornot = prompt().toLowerCase();
            if (playornot == "y") {
                start = false;
                regame = true;
                console.log("Game restart!");
                break;
            }
            else {
                start = false;
                regame = false;
                break;
            }
        }
    }
}
    

    
        


     run()