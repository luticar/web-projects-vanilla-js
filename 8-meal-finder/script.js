const menu = {
  search: null,
  submit: null,
  random: null,
  mealsElem: null,
  resultHeading: null,
  singleMealElem: null,
  fetchMeal(term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        menu.resultHeading.innerHTML = `<h2>Search results for <em>${term}</em>:</h2>`;
        if (data.meals === null) {
          menu.resultHeading.innerHTML = `<p>Term not found. Please, try again.</p>`;
        } else {
          menu.mealsElem.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class='meal'>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>`
            )
            .join(" ");
        }
      });
  },
  //   displayMealThumbs(meals) {

  //   },
  getValuefromInput() {
    const term = menu.search.value;
    if (term.trim()) {
      menu.fetchMeal(term);
      return;
    }
    alert("please fill the search field");
  },

  searchMeal(e) {
    console.log(e.target);
    getValuefromInput();
    menu.singleMealElem.innerHTML = "HELLO";
  },
  addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
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
  getrandomMeal() {
    console.log("clicou em random");
  },
  //aqui
  getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        menu.addMealToDOM(meal);
      });
  },
  getRandomMeal() {
    menu.mealsElem.innerHTML = "";
    menu.resultHeading.innerHTML = "";
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => {
        const meal = data.meals[0];
        menu.addMealToDOM(meal);
      });
  },
};

function initialize() {
  console.log("inicializado");
  menu.search = document.getElementById("search");
  menu.submit = document.getElementById("submit");
  menu.random = document.getElementById("random");
  menu.mealsElem = document.getElementById("meals");
  menu.resultHeading = document.getElementById("result-heading");
  menu.singleMealElem = document.getElementById("single-meal");
  menu.random.addEventListener("click", menu.getRandomMeal);
  menu.submit.addEventListener("click", menu.getValuefromInput);
  menu.mealsElem.addEventListener("click", (event) => {
    const mealInfo = event.target;
    console.log("target: " + mealInfo);
    // ((item) => {
    //   if (item.classList) {
    //     return item.classList.contains("meal-info");
    //   } else {
    //     return false;
    //   }
    // });
    if (mealInfo) {
      const mealId = mealInfo.getAttribute("data-mealID");
      menu.getMealById(mealId);
      console.log("id: " + mealId);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();
});
