// ==================== turn music ====================
const tingmusic = new Audio("ting.mp3");
const nexturn = document.querySelector(".nexturn");
let gameover = false;
const resetbtn = document.getElementById("reset");
let turn = "X";
const giffile = document.querySelector(".photobox img");
const winningline = document.querySelector(".winningline");

// ==================== function to change turn ====================
const changeturn = () => {
  return turn === "X" ? "O" : "X";
};
// ==================== function to check for a win ====================
const checkwin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let winningpossibilities = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 42],
    [2, 4, 6, -1, 16, 134],
  ];
  winningpossibilities.forEach((winpossibility) => {
    if (
      boxtext[winpossibility[0]].innerText ===
        boxtext[winpossibility[1]].innerText &&
      boxtext[winpossibility[1]].innerText ===
        boxtext[winpossibility[2]].innerText &&
      boxtext[winpossibility[0]].innerText !== ""
    ) {
      // by default we've put gameover = false that's why we've put here to perform some operations gameover = true means if the game is over then print the winning name else print the next turn for the player name with O or X
      gameover = true;
      nexturn.innerHTML = `${
        boxtext[winpossibility[0]].innerText
      } won the game`;
      giffile.style.opacity = "1";
      winningline.style.opacity = "1";
      winningline.style.transform = `translate(${winpossibility[3]}vw, ${winpossibility[4]}vw) rotate(${winpossibility[5]}deg)`;
    }
  });
};

// ==================== game logic ====================
const allbox = document.getElementsByClassName("box");
Array.from(allbox).forEach((box) => {
  let boxtext = box.querySelector(".boxtext");
  box.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeturn();
      checkwin();
      tingmusic.play();
      // ============ if the game is not over then print the user having the next turn ============
      if (!gameover) {
        nexturn.innerHTML = `turn for ${turn}`;
      }
    }
  });
});

// ==================== reset/clear the tictactoe board ====================
resetbtn.addEventListener("click", () => {
  let allboxtext = document.getElementsByClassName("boxtext");
  Array.from(allboxtext).forEach((boxtext) => {
    boxtext.innerText = "";
    giffile.style.opacity = "0";
    winningline.style.opacity = "0";
  });
});
