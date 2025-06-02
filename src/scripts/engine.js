const emojis = [
  "🗡",
  "🗡",
  "⚔️",
  "⚔️",
  "🪓",
  "🪓",
  "💀",
  "💀",
  "🧙‍♂",
  "🧙‍♂",
  "🧝",
  "🧝",
  "☄️",
  "☄️",
  "👹",
  "👹",
];
let openCards = [];
let lockBoard = false;

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function setupGame() {
  const gameBoard = document.querySelector(".game");
  gameBoard.innerHTML = "";
  openCards = [];
  lockBoard = false;
  const shuffled = shuffle([...emojis]);
  for (let i = 0; i < shuffled.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    // estrutura de frente e verso
    box.innerHTML = `
      <div class="item-inner">
        <div class="item-front">${shuffled[i]}</div>
        <div class="item-back"></div>
      </div>
    `;
    box.onclick = handleClick;
    gameBoard.appendChild(box);
  }
}

function handleClick() {
  if (lockBoard) return;
  if (this.classList.contains("boxOpen") || this.classList.contains("boxMatch"))
    return;

  this.classList.add("boxOpen");
  openCards.push(this);

  if (openCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [first, second] = openCards;
  // pega o emoji da frente
  const emoji1 = first.querySelector('.item-front').textContent;
  const emoji2 = second.querySelector('.item-front').textContent;
  if (emoji1 === emoji2) {
    first.classList.add("boxMatch");
    second.classList.add("boxMatch");
    openCards = [];
    lockBoard = false;
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
      setTimeout(() => {
        document.querySelector(".container").classList.add("victory");
        alert("Você venceu!");
      }, 300);
    }
  } else {
    setTimeout(() => {
      first.classList.remove("boxOpen");
      second.classList.remove("boxOpen");
      openCards = [];
      lockBoard = false;
    }, 600);
  }
}

document.querySelector(".reset").onclick = function () {
  document.querySelector(".container").classList.remove("victory");
  setupGame();
};

window.onload = setupGame;
