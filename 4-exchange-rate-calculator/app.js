const currencyFrom = document.getElementById("currency-one");
const currencyTo = document.getElementById("currency-two");
const amountFrom = document.getElementById("amount-one");
const amountTo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap");
const ApiUrl = "https://api.exchangerate-api.com/v4/latest/";

//Event listeners
currencyFrom.addEventListener("change", calculate);
amountFrom.addEventListener("input", calculate);
currencyTo.addEventListener("change", calculate);
amountTo.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  calculate();
});

function calculate() {
  const currencyOne = currencyFrom.value;
  const currencyTwo = currencyTo.value;
  fetch(ApiUrl + currencyOne)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountTo.value = (amountFrom.value * rate).toFixed(2);
    });
}

// populate select input
function populateOption(currency) {
  let dropdown = currency;

  fetch(ApiUrl + "USD")
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
    .catch(err => {
      console.error("Fetch Error -", err);
    });
}

populateOption(currencyFrom);
populateOption(currencyTo);
