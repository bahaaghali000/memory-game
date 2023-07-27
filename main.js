document.querySelector(".control-buttons span").onclick = function () {
  // Enter User Name
  let yourName = prompt("Whats Your Name?");

  if (yourName === null || yourName === "") {
    document.getElementById("user-name").innerHTML = "Unknown";
    // Not Is Not Empty
  } else {
    // Set Name To Your Name
    document.getElementById("user-name").innerHTML = yourName;
  }

  // remove controls buttons
  document.querySelector(".control-buttons").remove();
  // set Timer function
  startTimer();
};

let startTime; // variable to store the start time
let timerInterval; // variable to store the interval ID
const TIMER_DURATION = 5 * 60 * 1000; // 10 minutes in milliseconds

function startTimer() {
  startTime = new Date().getTime(); // get the current time in milliseconds
  timerInterval = setInterval(updateTimer, 1000); // update the timer display every second
}

function updateTimer() {
  const elapsedTime = new Date().getTime() - startTime; // calculate the elapsed time in milliseconds
  const remainingTime = TIMER_DURATION - elapsedTime; // calculate the remaining time in milliseconds

  if (remainingTime <= 0) {
    // if the timer has reached 10 minutes
    clearInterval(timerInterval); // stop the timer
    const timerDisplay = document.getElementById("timer"); // get the timer element
    timerDisplay.innerText = "Time's up!"; // display a message
    // add code to end the game here
    alert("Time's up!");
    window.location.reload();
  } else {
    // if the timer is still running
    const minutes = Math.floor(remainingTime / 60000); // calculate the number of minutes
    const seconds = Math.floor((remainingTime % 60000) / 1000); // calculate the number of seconds
    const timerDisplay = document.getElementById("timer"); // get the timer element
    timerDisplay.innerText = `${minutes.toString().padStart(1, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`; // update the timer display
  }
}

let duration = 1000;

// Select Block Container
let blockContainer = document.querySelector(".game-blocks");

// Create Array Form Game Blocks
let gameBlocks = Array.from(blockContainer.children);

// Create Range Of Keys
let orderRange = [...Array(gameBlocks.length).keys()];

// Shuffle Game Blocks
orderRange.sort(() => 0.5 - Math.random());

// Add Order CSS Property To Game Blocks
gameBlocks.forEach((block, i) => {
  block.style.order = orderRange[i];
  block.onclick = () => {
    flipBlock(block);
  };
});

// Flip block on click event function
function flipBlock(selectBlock) {
  // Add class to block is-flipped
  selectBlock.classList.add("is-flipped");

  // collecting all flippled blocks
  let allFlippedBlocks = gameBlocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );

  // if there two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();

    // check matche block function
    checkedMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add class no clicking to main container
  blockContainer.classList.add("no-clicking");
  // Remove class is-flipped from all flipped blocks
  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Blocks function
function checkedMatchedBlocks(fristBlock, secondBlock) {
  let userTries = document.getElementById("user-tries");
  if (
    fristBlock.getAttribute("data-techno") ===
    secondBlock.getAttribute("data-techno")
  ) {
    fristBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    fristBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    setTimeout(() => {
      fristBlock.classList.add("hidden");
      secondBlock.classList.add("hidden");
    }, duration);
    document.getElementById("success").play();
  } else {
    document.getElementById("fail").play();
    setTimeout(() => {
      userTries.innerHTML = +userTries.innerHTML + 1;
      fristBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
      // Put Limit to tries
      if (+userTries.innerHTML === 10) {
        alert("Sorry, You Have Reached The Limit");
        // rest Game function
        resetGame();
      }
    }, duration);
  }
}

function resetGame() {
  window.location.reload();
}
