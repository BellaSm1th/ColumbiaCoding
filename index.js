//basic variable declaration of varibles

var board = [];
var DisplayBoard = document.getElementById("board");
var keyPressed;
var DisplayWins = document.getElementById("winningAlert");


//creating the board
for (let i = 0; i < 15; i++) {
    var holder = [];
    for (let j = 0; j < 7; j++) {
        holder[j] = "";
    }
    board[i] = holder;
}

console.log(board);

//adding each element into the board for later use
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        var newSquare = document.createElement("div");
        newSquare.setAttribute("class", "square");
        DisplayBoard.appendChild(newSquare);
        board[i][j] = newSquare;
    }

}


//function for the animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//checking specificly for the spacebar
function check() {
    document.onkeydown = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === " ") {
            keyPressed = e.key;
        }

    }
}


var end = false;
async function game(row) {
    check();
    var counter = 0;


    //the animation for the blocks while the spacebar is not pressed
    while (!keyPressed) {

        if (counter > 2) {
            var square = board[row][counter - 3];
            square.setAttribute("class", "square");
        }
        if (counter === 0) {
            var square = board[row][3];
            square.setAttribute("class", "square");
            end = false;
        }

        if (counter === board[0].length) {

            end = true;
            counter = 4;
        }




        var square = board[row][counter];
        square.setAttribute("class", "checked square");



        if (end === true) {



            counter--;



            if (counter < 3) {
                var square = board[row][counter + 4];
                square.setAttribute("class", "square");
            }

        } else {

            counter++;
        }

        //animation of the blocks

        await sleep(125);
    }

    var checker = 1;
    var blocksUnder = 0;



    if (row < 14) {

        checker = 0;
        blocksUnder = 0;


        var index = 0;
        for (let i = 0; i < board[row].length; i++) {
            var element = board[row][i];

            if (element.getAttribute("class") === "checked square") {
                index = i;
                console.log(index);
                break;
            }

        }


        //checking if the red blocks are over other red blocks
        for (let i = 0; i < board[row].length; i++) {
            var element = board[row][i];
            var under = board[row + 1][i];

            if (!(under.getAttribute("class") === "checked square")) {
                element.setAttribute("class", "square");
            } else {
                blocksUnder++;
            }

        }

        for (let i = 0; i < 3; i++) {

            var element = board[row][index + i];
            var under = board[row + 1][index + i];

            if (under.getAttribute("class") === "square" && element.getAttribute("class") === "square") {
                checker++;
            }

        }



        var winningDiv = document.createElement("div");
        winningDiv.setAttribute("id", "winningBox");
        //winning the minor prize at row 5
        if (row == 5) {

            var text = document.createTextNode("You won a minor prize!");

            winningDiv.appendChild(text);
            DisplayWins.appendChild(winningDiv);
            await sleep(20)
        }
        //winning the major prize at the top row
        if (row === 0) {
            var text = document.createTextNode("You won a major prize!");

            winningDiv.appendChild(text);
            DisplayWins.appendChild(winningDiv);
            await sleep(20)

        }

        //function when the player loses

        function lost() {

            var text = document.createTextNode("You lost. Try again!");
            winningDiv.appendChild(text);
            DisplayWins.appendChild(winningDiv);
        }





        //checking when the player loses

        if (blocksUnder === 3) {
            if (checker >= blocksUnder) {
                console.log("finished");
                lost();
                return;
            }
        } 

    }
    keyPressed = null;



    return game(row - 1);

}



game(14);