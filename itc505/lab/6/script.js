const TARGET_BOX = document.querySelector("#target-box");
const GAME_STATUS_BTN = document.querySelector("#game-status-btn");
const GUESS_DISPLAY = document.querySelector("#guess-display");
const END_MSG_DISPLAY = document.querySelector("#end-msg-display");
const GUESS_HISTORY = document.querySelector("#guess-history");

const GAME_CONTROLS = document.querySelector("#game-controls");
const CORRECT_BTN = document.querySelector("#correct-btn");
const TOO_LOW_BTN = document.querySelector("#too-low-btn");
const TOO_HIGH_BTN = document.querySelector("#too-high-btn");
const CONTROL_BTNS = document.querySelectorAll(".control-btn");

let ballsContainer; // Reference to the balls container

function startGame() {
  const userNumber = parseInt(TARGET_BOX.value);
  TARGET_BOX.disabled = true;
  GAME_STATUS_BTN.innerText = "Reset";

  // Change background color
  document.body.style.backgroundColor = getRandomColor();

  // Add particles or balls with the user's number
  ballsContainer = createBalls(userNumber);

  GAME_CONTROLS.style.display = "none";
  END_MSG_DISPLAY.innerText = `I guessed with ${userNumber} balls on the screen.`;
}

function endGame() {
  clearBalls();
  clearGuessHistory();
}

function resetGame() {
  TARGET_BOX.disabled = false;
  GAME_STATUS_BTN.innerText = "Start!";
  END_MSG_DISPLAY.innerText = "";
  clearGuessHistory();
  GUESS_DISPLAY.innerHTML = ""; // Clear the display
  document.body.style.backgroundColor = ""; // Reset background color
  clearBalls();
}

function clearGuessHistory() {
  while (GUESS_HISTORY.firstElementChild) {
    GUESS_HISTORY.firstElementChild.remove();
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createBalls(number) {
  clearBalls();

  const ballsContainer = document.createElement("div");
  ballsContainer.classList.add("balls-container");

  for (let i = 0; i < number; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.innerText = i + 1;
    ball.style.left = `${Math.random() * 80}vw`;
    ball.style.animationDuration = `${Math.random() * 2 + 1}s`;
    ballsContainer.appendChild(ball);
  }

  document.body.appendChild(ballsContainer);

  return ballsContainer;
}

function clearBalls() {
  if (ballsContainer) {
    ballsContainer.remove();
    ballsContainer = null;
  }
}

function toggleGameStatus() {
  if (TARGET_BOX.disabled) {
    resetGame();
  } else {
    startGame();
  }
}

function revertGameState(event) {
  if (event.target.parentNode !== GUESS_HISTORY) {
    return;
  }
}

GUESS_HISTORY.addEventListener("click", revertGameState);
GAME_STATUS_BTN.addEventListener("click", toggleGameStatus);
CORRECT_BTN.addEventListener("click", endGame);

// Remove the guessing-related event listeners
TOO_HIGH_BTN.removeEventListener("click", adjustGuess);
TOO_LOW_BTN.removeEventListener("click", adjustGuess);
