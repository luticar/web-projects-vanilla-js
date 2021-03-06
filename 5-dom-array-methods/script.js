const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealthness");

let data = [];

getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// add new object to the data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const totalWealth = document.createElement("div");
  totalWealth.innerHTML = `<h3><strong>Total: </strong> ${formatMoney(
    wealth
  )}</h3>`;
  main.appendChild(totalWealth);
}
// Event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
