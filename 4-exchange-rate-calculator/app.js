const currencyElOne = document.getElementById("currency-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElOne = document.getElementById("amount-one");
const amountElTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap");
const url = "https://api.exchangerate-api.com/v4/latest/USD";

//Event listeners
currencyElOne.addEventListener("change", calculate);
amountElOne.addEventListener("input", calculate);
currencyElTwo.addEventListener("change", calculate);
amountElTwo.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

function calculate() {
  const currency_one = currencyElOne.value,
    currency_two = currencyElTwo.value;
  fetch(` https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

// populate select input
function populateOption(currencyElNum) {
  let dropdown = currencyElNum;

  fetch(url)
    .then(response => {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(data => {
        Object.keys(data.rates).forEach(key => {
          let option = document.createElement("option");
          option.text = key;
          option.value = key;
          dropdown.add(option);
        });
      });
    })
    .catch(function(err) {
      console.error("Fetch Error -", err);
    });
}

populateOption(currencyElOne);
populateOption(currencyElTwo);
