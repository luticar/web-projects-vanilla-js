const menu = {
  search: null,
  submit: null,
  random: null,
  mealsElem: null,
  resultHeading: null,
  singleMealElem: null,
  clearElements() {
    menu.mealsElem.innerHTML = "";
    menu.resultHeading.innerHTML = "";
  },
  notFoundMsg() {
    menu.resultHeading.innerHTML = "<p>Word not found. Please, try again.</p>";
  },
  emptyFieldMsg() {
    menu.resultHeading.innerHTML = "<p>Please fill the search field.</p>";
  },
  displayMealThumbs(meals) {
    if (meals === null) {
      menu.notFoundMsg();
    } else {
      menu.clearElements();
      menu.mealsElem.innerHTML = meals
        .map(
          (meal) =>
            `<div class='meal'>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            ${meal.strMeal}
            </div>
            </div>`
        )
        .join(" ");
    }
  },
  fetchMeal(term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        menu.displayMealThumbs(data.meals);
      });
  },
  getValueFromInput() {
    const term = menu.search.value;
    if (term.trim()) {
      menu.fetchMeal(term);
      return;
    }
    menu.emptyFieldMsg();
  },
  displayMealInfo(meal, ingredients) {
    menu.singleMealElem.innerHTML = `<div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<h4>${meal.strCategory}</h4>` : ""}
     ${meal.strArea ? `<h4>${meal.strArea}</h4>` : ""}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join(" ")}</ul>
    </div>`;
  },
  fillRecipeArray(meal, ingredients) {
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
  },
  showMealRecipe(event) {
    const mealInfo = event.target;
    if (mealInfo) {
      const mealId = mealInfo.getAttribute("data-mealID");
      menu.getMealById(mealId);
    }
  },
  addMealToDOM(meal) {
    const ingredients = [];
    menu.fillRecipeArray(meal, ingredients);
    menu.displayMealInfo(meal, ingredients);
  },
  getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        menu.addMealToDOM(meal);
      });
  },
  getRandomMeal() {
    menu.clearElements();
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        menu.addMealToDOM(meal);
      });
  },
  enterToSubmit(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      menu.getValueFromInput();
    }
  },
};

function initialize() {
  menu.search = document.getElementById("search");
  menu.submit = document.getElementById("submit");
  menu.random = document.getElementById("random");
  menu.mealsElem = document.getElementById("meals");
  menu.resultHeading = document.getElementById("result-heading");
  menu.singleMealElem = document.getElementById("single-meal");
  menu.random.addEventListener("click", menu.getRandomMeal);
  menu.submit.addEventListener("click", menu.getValueFromInput);
  window.addEventListener("keydown", menu.enterToSubmit);
  menu.mealsElem.addEventListener("click", menu.showMealRecipe);
}

document.addEventListener("DOMContentLoaded", initialize);
