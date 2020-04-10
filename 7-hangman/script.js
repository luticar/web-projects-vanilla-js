document.addEventListener("DOMContentLoaded", async () => {
  console.log("page loaded!");
  const wordElem = document.getElementById("word");
  const wrongLettersElem = document.getElementById("wrong-letters");
  const playAgainBtn = document.getElementById("play-btn");
  const popup = document.getElementById("popup-container");
  const notification = document.getElementById("notification-container");
  const finalMsg = document.getElementById("final-msg");

  const figureParts = document.querySelectorAll(".figure-part");

  const fetchWord = async () => {
    const res = await fetch("words.json");
    const data = await res.json();
    const wordsArr = data.map((word) => word.name);
    return wordsArr;
  };

  const sortWord = async () => {
    const words = await fetchWord();
    return words[Math.floor(Math.random() * words.length)];
  };

  let selectedWord = await sortWord();
  let playable = true;

  const correctLetters = [];
  const wrongLetters = [];

  const displayUnderscoreAndLetter = () => {
    if (!selectedWord) return;
    wordElem.innerHTML = `${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join(" ")}`;

    const innerWord = wordElem.innerText.replace(/[ \n]/g, "");
    if (innerWord === selectedWord) {
      finalMsg.innerText = "Congratulations, you won! 🤩";
      popup.style.display = "flex";
      playable = false;
      document.onkeydown = (e) => {
        if (e.keyCode === 13) {
          restartGame();
        }
      };
    }
  };

  const updateWrongLettersElem = () => {
    wrongLettersElem.innerHTML = `${
      wrongLetters.length > 0 ? "<p>Wrong</p>" : ""
    }
      ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
    drawFigure();
    endGame();
  };

  const drawFigure = () => {
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;
      if (index < errors) {
        part.style.display = "block";
      } else {
        part.style.display = "none";
      }
    });
  };

  notificationRepeatedLetter = () => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 1500);
  };

  const endGame = () => {
    if (wrongLetters.length === 6) {
      finalMsg.innerHTML = `<p>Sorry, you lost 😓<br/> answer: ${selectedWord}</p>`;
      popup.style.display = "flex";
      playable = false;
      document.onkeydown = (e) => {
        if (e.keyCode === 13) {
          restartGame();
        }
      };
    }
  };

  // keydown letter press
  window.addEventListener("keydown", (e) => {
    if (playable) {
      // check if it is a letter key
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayUnderscoreAndLetter();
          } else {
            notificationRepeatedLetter();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLettersElem();
          } else {
            notificationRepeatedLetter();
          }
        }
      }
    }
  });

  // Restart
  const restartGame = async () => {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = await sortWord();
    displayUnderscoreAndLetter();
    updateWrongLettersElem();
    popup.style.display = "none";
  };

  playAgainBtn.addEventListener("click", restartGame);

  displayUnderscoreAndLetter();
});
