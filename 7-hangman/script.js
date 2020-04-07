document.addEventListener("DOMContentLoaded", function () {
  console.log("page loaded!");
  const wordEl = document.getElementById("word");
  const wrongLetterEl = document.getElementById("wrong-letters");
  const playAgainBtn = document.getElementById("play-again");
  const popup = document.getElementById("popup-container");
  const notification = document.getElementById("notification-container");
  const finalMsg = document.getElementById("final-msg");

  const figureParts = document.querySelectorAll(".figure-parts");

  const words = ["fosbaldo", "dinofauro", "tonton", "naruto"];
  let selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  const correctLetters = [];
  const wrongLetters = [];

  function displayWord() {
    wordEl.innerHTML = `${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join(" ")}`;
  }

  const innerWord = wordEl.innerText.replace(/\n/g, " ");
  if (innerWord === selectedWord) {
    finalMsg.innerText = "Congratulations, you won! 🤩";
    popup.style.display = "flex";
  }

  function updateWrongLettersEl() {
    console.log("errou");
    wrongLetterEl.innerHTML = "errou";
  }

  function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 1500);
  }
  // keydown letter press
  window.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
      console.log("you hit: " + letter);
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
        }
        updateWrongLettersEl();
      }
    }
  });
  displayWord();
});
