let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".New");
let alertBox = document.querySelector(".alert");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

// Initialize scores from localStorage or default to 0
let xWins = localStorage.getItem('xWins') ? parseInt(localStorage.getItem('xWins')) : 0;
let oWins = localStorage.getItem('oWins') ? parseInt(localStorage.getItem('oWins')) : 0;

document.getElementById("xWins").innerText = xWins;
document.getElementById("oWins").innerText = oWins;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    alertBox.classList.add("hide");
    msg.innerText = "";
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winning-box");
        box.classList.remove("x", "o");
    });
    newGameBtn.disabled = false;
};

const boxesArray = Array.from(boxes);

boxesArray.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!box.innerText) {
            if (turnO) {
                box.innerText = "O";
                box.classList.add("o");
            } else {
                box.innerText = "X";
                box.classList.add("x");
            }
            turnO = !turnO;
            box.disabled = true;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            } else if (isWinner) {
                newGameBtn.disabled = false;
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw";
    alertBox.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxesArray.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxesArray.forEach((box) => {
        box.disabled = false;
    });
};

const showWinner = (winner, pattern) => {
    if (winner === "X") {
        xWins++;
        localStorage.setItem('xWins', xWins);  // Store X wins in localStorage
        document.getElementById("xWins").innerText = xWins;
    } else if (winner === "O") {
        oWins++;
        localStorage.setItem('oWins', oWins);  // Store O wins in localStorage
        document.getElementById("oWins").innerText = oWins;
    }
    
    msg.innerText = `Congratulations, Winner is ${winner}`;
    alertBox.classList.remove("hide");

    pattern.forEach(index => {
        boxesArray[index].classList.add("winning-box");
    });

    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxesArray[pattern[0]].innerText;
        let pos2Val = boxesArray[pattern[1]].innerText;
        let pos3Val = boxesArray[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return true;
            }
        }
    }
    return false;
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
