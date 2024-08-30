let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".New");
let alertBox = document.querySelector(".alert");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
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
    boxes.forEach((box) => (box.innerText = ""));
    newGameBtn.disabled = false; // Enable the "New Game" button
};


const boxesArray = Array.from(boxes);

boxesArray.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!box.innerText) {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            box.disabled = true;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            } else if (isWinner) {
                newGameBtn.disabled = false; // Enable the "New Game" button when there's a winner
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
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    alertBox.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxesArray[pattern[0]].innerText;
        let pos2Val = boxesArray[pattern[1]].innerText;
        let pos3Val = boxesArray[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
