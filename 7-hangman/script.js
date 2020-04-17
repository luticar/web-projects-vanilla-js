const game = {
  wordElem: null,
  wrongLettersElem: null,
  playAgainBtn: null,
  popup: null,
  notification: null,
  finalMsg: null,
  figureParts: null,
  selectedWord: null,
  playable: true,
  correctLetters: [],
  wrongLetters: [],

  displayUnderscoreAndLetter() {
    if (!game.selectedWord) return;
    game.wordElem.innerHTML = game.selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">${
            game.correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join(" ");

    const innerWord = game.wordElem.innerText.replace(/[ \n]/g, "");
    if (innerWord !== game.selectedWord) return;

    game.finalMsg.innerText = "Congratulations, you won! 🤩";
    game.popup.style.display = "flex";
    game.playable = false;
  },

  endGame() {
    if (game.wrongLetters.length < 6) return;

    game.finalMsg.innerHTML = `<p>Sorry, you lost 😓<br/> answer: ${game.selectedWord}</p>`;
    game.popup.style.display = "flex";
    game.playable = false;
  },

  updateWrongLettersElem() {
    if (game.wrongLetters.length === 0)
      return (game.wrongLettersElem.innerHTML = "");

    const letters = game.wrongLetters
      .map((l) => `<span>${l}</span>`)
      .join(", ");
    game.wrongLettersElem.innerHTML = `<p>Wrong: </p> ${letters}`;
    game.drawFigure();
    game.endGame();
  },

  drawFigure() {
    game.figureParts.forEach((part, index) => {
      const errors = game.wrongLetters.length;
      part.style.display = index < errors ? "block" : "none";
    });
  },

  notificationRepeatedLetter() {
    game.notification.classList.add("show");
    setTimeout(() => {
      game.notification.classList.remove("show");
    }, 1500);
  },

  onKeyDown(e) {
    const { correctLetters, wrongLetters, selectedWord } = game;

    if (!game.playable) {
      if (isEnter(e)) game.restart();
      return;
    }
    if (!isLetter(e)) return;

    const letter = e.key.toLowerCase();
    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      return game.notificationRepeatedLetter();
    }

    if (selectedWord.includes(letter)) {
      correctLetters.push(letter);
      game.displayUnderscoreAndLetter();
    } else {
      wrongLetters.push(letter);
      game.updateWrongLettersElem();
    }
  },

  async restart() {
    game.playable = true;
    game.correctLetters = [];
    game.wrongLetters = [];
    game.selectedWord = await raffleWord();

    game.displayUnderscoreAndLetter();
    game.updateWrongLettersElem();
    game.drawFigure();
    game.popup.style.display = "none";
  },

  initialize() {
    game.wordElem = document.getElementById("word");
    game.wrongLettersElem = document.getElementById("wrong-letters");
    game.playAgainBtn = document.getElementById("play-btn");
    game.popup = document.getElementById("popup-container");
    game.notification = document.getElementById("notification-container");
    game.finalMsg = document.getElementById("final-msg");
    game.figureParts = document.querySelectorAll(".figure-part");

    window.addEventListener("keydown", game.onKeyDown);
    game.playAgainBtn.addEventListener("click", game.restart);
  },
};

let fetchedWords;
const fetchWord = async () => {
  if (fetchedWords) return fetchedWords;

  const res = await fetch("words.json");
  const data = await res.json();
  fetchedWords = data.map((word) => word.name);
  return fetchedWords;
};

const raffleWord = async () => {
  const words = await fetchWord();
  return words[Math.floor(Math.random() * words.length)];
};

const isLetter = (e) => e.keyCode >= 65 && e.keyCode <= 90;
const isEnter = (e) => e.keyCode === 13;

document.addEventListener("DOMContentLoaded", () => {
  game.initialize();
  game.restart();
});
