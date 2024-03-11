
//1) Define required constants
// Constants //
const players = {
    "1": "pizza",
    "-1": "avocado",
    "null": "white"
}

const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

//2) Define required variables used to track the state of the game
/* --state variables--  */
let board = [];
let turn;
let winner;


// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
const message = document.querySelector('h1');
const play = document.querySelector('button')
const squares = [...document.querySelectorAll('#board > div')];
// const square1 = document.getElementById('f0');
// const square2 = document.getElementById('f1');
// const square3 = document.getElementById('f2');
// const square4 = document.getElementById('f3');
// const square5 = document.getElementById('f4');
// const square6 = document.getElementById('f5');
// const square7 = document.getElementById('f6');
// const square8 = document.getElementById('f7');
// const square9 = document.getElementById('f8');



// 4) Upon loading the app should:
// 4.1) Initialize the state variables
init();
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;// Player 'X' will be first player to go, player 'O' will be represented by -1, and will be the next one to go
    winner = null
    render()
}

// 4.2) Render those values to the page
// 4.2.1) Render the board
function renderBoard() {
    board.forEach((field, idx) => {
        const fieldEl = document.getElementById(`f${idx}`)
        //console.log(fieldEl)
        //this is for only adding color
        //fieldEl.style.backgroundColor = players[field]
        if (players[field] === "avocado") {
            fieldEl.classList.add("avocadoBox");
        } else if (players[field] === "pizza") {
            fieldEl.classList.add("pizzaBox");
        }
    })
}


// 4.2.2) Render a message
function renderMessage() {
    console.log("Winner:", winner);
    console.log("Turn:", turn);
    if (winner === "T") {
        message.innerText = "It's a Tie!"
    }
    else if (winner) {
        message.innerHTML = `<span>${players[winner].toUpperCase()}</span> Wins!`;
    } else {
        message.innerHTML = `<span>${players[turn].toUpperCase()}'s</span> Turn!`;
    }
}


// 4.3) Wait for the user to click a square
document.getElementById("board").addEventListener('click', handleClick);


// 5) Handle a player clicking a square
function handleClick(e) {
    const fieldIdx = squares.indexOf(e.target);

    // console.log(filedIdx)
    if (board[fieldIdx] || winner) return;
    //  5.4) Update the board array at the index with the value of turn.
    board[fieldIdx] = turn;
    //   5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
    winner = checkWinner()
    turn *= -1;
    //console.log(fieldIdx)
    // console.log(board)
    render()
}

function render() {
    renderBoard()
    renderMessage()
}

// 5.6) Set the winner variable if there's a winner: NOT WORKING
function checkWinner() {
    for (let i = 0; i < winComb.length; i++) {
        let sum = 0;
        winComb[i].forEach((index) => {
            sum += board[index];
            console.log(sum);
        });
        console.log("Checking combination:", winComb[i]);
        console.log("Sum:", sum);

        console.log(sum);
        if (Math.abs(sum) === 3) {
            console.log("Winner found:", winner);
            winner = board[winComb[i][0]];
            console.log(`Winner is  ${players[winner]}`)
            return winner;
        }
    }
    if (!board.includes(null)) {
        winner = "T";
        return winner;
    }
    return null;
}


// 6) Handle a player clicking the replay button
//   6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
function reset() {
    init();
    const squares = [...document.querySelectorAll('#board > div')];
    squares.forEach(field => {
        field.classList.remove("avocadoBox");
        field.classList.remove("pizzaBox")
    })
}
play.addEventListener('click', reset)