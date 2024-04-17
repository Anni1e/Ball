const ball = document.querySelector(".ball");
const historyClick = document.querySelector(".historyClick");
let timeClick = [];
let currentResult = document.querySelector(".currentResult");
let bestResult = document.querySelector(".bestResult");
let averageResult = document.querySelector(".averageResult");
const startOver = document.querySelector(".startOver");
const cursor = document.querySelector(".cursor");
const gameBall = document.querySelector(".gameBall");

bestResult.classList.add("d-none");
currentResult.classList.add("d-none");

let nameCursor = 0;
cursor.addEventListener("click", () => {
  let body = document.querySelector("body");
  if (nameCursor < 10) {
    nameCursor++;
  } else if (nameCursor == 10) {
    nameCursor -= 9;
  }
  const urlCursor = `../src/img/octopus${nameCursor}.png`;
  body.style.cursor = `url(${urlCursor}), auto`;
});

//начать игру заново
startOver.addEventListener("click", () => {
  historyClick.innerHTML = "";
  averageResult.innerHTML = "";
  bestResult.classList.add("d-none");
  currentResult.classList.add("d-none");
  timeClick = [];
});

//перемещение мяча и измерение времени между кликами
let mathDateStart = Date.now();
let time = 0;

ball.addEventListener("click", () => {
  const x = Math.floor(Math.random() * 600);
  const y = Math.floor(Math.random() * 600);
  let mathDateEnd = Date.now();
  time = ((mathDateEnd - mathDateStart) / 1000).toFixed(2);
  function change() {
    ball.style.transform = `translate(${x}px, ${y}px)`;
  }
  if (historyClick.children.length > 5) {
    historyClick.removeChild(historyClick.children[0]);
  }

  renderHistory();
  change();

  let sum = timeClick.reduce((acc, el) => acc + el, 0);
  averageResult.innerHTML = `Average Result:</br> ${(
    +sum / +timeClick.length
  ).toFixed(2)} сек`;

  mathDateStart = mathDateEnd;
});

//пояснение к best/current result
bestResult.addEventListener("mouseover", () => {
  bestResult.textContent = "Best result";
});
bestResult.addEventListener("mouseout", () => {
  bestResult.textContent = `${Math.min(...timeClick).toFixed(2)} сек`;
});
currentResult.addEventListener("mouseover", () => {
  currentResult.textContent = "Current result";
});
currentResult.addEventListener("mouseout", () => {
  currentResult.textContent = `${time} сек`;
});

//отрисовка истории кликов
function renderHistory() {
  bestResult.classList.remove("d-none");
  currentResult.classList.remove("d-none");
  const card = document.createElement("p");
  card.innerHTML = `${time} сек`;
  historyClick.append(card);

  timeClick.push(parseFloat(time));
  if (Math.min(...timeClick) === parseFloat(time)) {
    card.style.backgroundColor = "hotpink";
    card.style.border = "hotpink";
    card.style.color = "white";
    bestResult.innerHTML = `${time} сек`;
    currentResult.innerHTML = `${time} сек`;
  } else {
    currentResult.innerHTML = `${time} сек`;
  }
}
