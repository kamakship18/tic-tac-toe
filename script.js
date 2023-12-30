document.addEventListener("DOMContentLoaded", function () {
    let player = "X";
    let mainGame = ["", "", "", "", "", "", "", "", ""];
    let active = true;

    // to check for a winner
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (mainGame[a] && mainGame[a] === mainGame[b] && mainGame[a] === mainGame[c]) {
                return mainGame[a];
            }
        }

        return null;
    };

    // update the game board
    const updateBoard = (index) => {
        if (mainGame[index] === "" && active) {
            mainGame[index] = player;
            const box = document.getElementById(index + 1);

           // styling
            box.textContent = player;
            box.style.display = "flex";
            box.style.alignItems = "center";
            box.style.justifyContent = "center";
            box.style.color = "yellow"; 
            box.style.fontSize = "40px";
            box.style.fontWeight = "bold";

            const winner = checkWinner();

            if (winner) {
                // messages for result
                document.getElementById("message").textContent = `${winner} has won the game!`;
                document.getElementById("result").style.display = "flex";
                active = false;
            } else if (!mainGame.includes("")) {
                document.getElementById("message").textContent = "It's a tie!";
                document.getElementById("result").style.display = "flex";
                active = false;
            } else {
                // next player move
                player = player === "X" ? "O" : "X";
            }
        }
    };

    // box clicks
    document.querySelectorAll(".box").forEach((box, index) => {
        box.addEventListener("click", () => {
            updateBoard(index);
        });
    });

    // play again button 
    document.getElementById("button").addEventListener("click", () => {
        // resets
        player = "X";
        mainGame = ["", "", "", "", "", "", "", "", ""];
        active = true;

        document.querySelectorAll(".box").forEach((box) => {
            box.textContent = "";
            box.style.display = "block"; 
        });

        document.getElementById("result").style.display = "none";
        document.getElementById("message").textContent = "";
    });
});
