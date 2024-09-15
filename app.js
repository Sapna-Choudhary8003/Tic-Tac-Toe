let msgContainer = document.querySelector(".msg-container");
let winnerMsg = document.querySelector("#winner-msg");
let newGameButton = document.querySelector("#new-button");
let resetButton = document.querySelector("#reset-button");
let boxes = document.querySelectorAll(".boxes"); 

let turnO = true; // There are two players X and O
let count = 0; // To track the draw condition

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                // Player O's turn
                box.innerText = "O";
                //turnO = false;
            } else {
                // Player X's turn
                box.innerText = "X";
                //turnO = true;
            }
            turnO = !turnO; // Toggle turn

            count++;
            box.disabled = true; // Disable the box after it's clicked

            let isWinner = checkWinner(); // Check if there's a winner

            if (count === 9 && !isWinner) {
                // Check for draw
                gameDraw();
            }
        }
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 !== "" && position1 === position2 && position2 === position3) {
            showWinner(position1); // Display winner
            return true; // Return true if there's a winner
        }
    }
    return false; // Return false if no winner found
}

const showWinner = (winner) => {
    winnerMsg.innerText = `Congratulations!\nWinner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true; // Disable all boxes after game ends
    });
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes(); // Enable all boxes for a new game
    msgContainer.classList.add("hide"); // Hide the winner message
    boxes.forEach(box => {
        box.innerText = ""; // Clear text content of each box
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false; // Enable all boxes for a new game
    });
};

const gameDraw = () => {
    winnerMsg.innerText = "Game is Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame)