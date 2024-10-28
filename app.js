let mainContainer=document.querySelector(".main");
let popUpBtn=document.querySelector(".pop-up")
let startBtn = document.querySelector(".startGame");
let startX = document.querySelector(".startX");
let startO = document.querySelector(".startO");
let turn = document.querySelector(".turn");
let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");

let newbtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let winPatterns = [
  [0, 1, 2], 
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let turnO = true;
startX.addEventListener("click", () => {
  turn.innerHTML = "turn X";
  turnO = false;
  startX.disabled=true;
});
startO.addEventListener("click", () => {
  turnO = true;
  turn.innerHTML = "turn O";
  startO.disabled=true;
});

startBtn.addEventListener("click", () => {
  popUpBtn.classList.add("pop-upHide");
});

// iterate all the boxes
boxs.forEach((box) => {
  // add Event on each box
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turn.innerHTML = "turn X";
      turnO = false;

    } else {
      box.innerHTML = "X";
      turn.innerHTML = "turn O";
      turnO = true;
    }
    // to freez the button after the once click
    box.classList.add("disabled");
    Checkwinner();
  });
});
const disabledBoxes = () => {
  for (let box of boxs) {
    box.classList.add("disabled"); // disable all buttons after winner
  }
};
const enableBoxes = () => {
  for (let box of boxs) {
    box.classList.remove("disabled");
    box.innerHTML = "";
  }
};
// reset game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  startX.disabled=false;
  startO.disabled=false;
};

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

let Checkwinner = () => {
  for (let Pattern of winPatterns) {
    let pos1 = boxs[Pattern[0]].innerText;
    let pos2 = boxs[Pattern[1]].innerText;
    let pos3 = boxs[Pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        mainContainer.classList.add("mainHide");// after winner game content hide
        showWinner(pos1);
      }
    }
  }
};
resetBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",()=>{
  turn.innerHTML="turn-";
});
newbtn.addEventListener("click", resetGame);  
newbtn.addEventListener("click",()=>{
  mainContainer.classList.remove("mainHide");
  turn.innerHTML="turn-";
});

