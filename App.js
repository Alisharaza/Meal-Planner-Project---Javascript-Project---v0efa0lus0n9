const calorieCalculated = `https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories`;
const getRecipe = `https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes`;
const form = document.getElementById("form");
const breakfastBox = document.querySelector(".breakfast");
const lunchBox = document.querySelector(".lunch");
const dinnerBox = document.querySelector(".dinner");
const breakfastRecipeBtn = document.querySelector(".breakfast-recipe-btn");
const lunchRecipeBtn = document.querySelector(".lunch-recipe-btn");
const dinnerRecipeBtn = document.querySelector(".dinner-recipe-btn");
/*======================================================================
                           Function
==========================================================================*/
let mealData;
async function fetchdata(URL) {
  const response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  return data;
}
async function showRecipe() {
  const recipe = await fetchdata(getRecipe);
  let recipeData;
  if (this.className.includes("breakfast")) {
    recipeData = recipe.find((data) => data.id === mealData.breakfast.id);
  } else if (this.className.includes("lunch")) {
    recipeData = recipe.find((data) => data.id === mealData.lunch.id);
  } else {
    recipeData = recipe.find((data) => data.id === mealData.dinner.id);
  }
  console.log(recipeData);
  const steps = recipeData.steps.split(". ");
  const stepsList = document.querySelector(".steps-list");
  stepsList.textContent = "";
  steps.forEach((data) => {
    const li = document.createElement("li");
    li.textContent = data;
    stepsList.appendChild(li);
  });
  let ingredients = recipeData.ingredients.split(", ");
  const ingredientsList = document.querySelector(".ingredients-list");
  ingredientsList.textContent = "";
  ingredients.forEach((data) => {
    const li = document.createElement("li");
    li.textContent = data;
    ingredientsList.appendChild(li);
  });
  document.getElementById("recipe").classList.add("active");
}
const render = async () => {};
render();
async function generateMeals(e) {
  e.preventDefault();
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const activity = document.getElementById("physical-activity").value;
  let bmr;
  if (gender.value == "f") {
    bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  } else {
    bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }
  console.log(bmr);
  let calories;
  if (activity.value === "light") {
    calories = bmr * 1.375;
  } else if (activity.value === "active") {
    calories = bmr * 1.725;
  } else {
    calories = bmr * 1.55;
  }
  calories = Math.round(calories);
  if (calories < 500 && calories > 3000) {
    return;
  }
  const caloryData = await fetchdata(calorieCalculated);
  mealData = caloryData.find(
    (data) => +data.min <= calories && +data.max >= calories
  );
  console.log(mealData);
  breakfastBox.querySelector(".title").textContent = mealData.breakfast.title;
  breakfastBox.querySelector(".img").src = mealData.breakfast.image;
  breakfastBox.querySelector(
    ".calories"
  ).textContent = `Calories - ${calories}`;
  lunchBox.querySelector(".title").textContent = mealData.lunch.title;
  lunchBox.querySelector(".img").src = mealData.lunch.image;
  lunchBox.querySelector(".calories").textContent = `Calories - ${calories}`;
  dinnerBox.querySelector(".title").textContent = mealData.dinner.title;
  dinnerBox.querySelector(".img").src = mealData.dinner.image;
  dinnerBox.querySelector(".calories").textContent = `Calories - ${calories}`;
  const divActive = document
    .querySelector(".div-active")
    .classList.add("active");
}
/*======================================================================
                            Event listenar
==========================================================================*/
breakfastRecipeBtn.addEventListener("click", showRecipe);
lunchRecipeBtn.addEventListener("click", showRecipe);
dinnerRecipeBtn.addEventListener("click", showRecipe);
form.addEventListener("submit", generateMeals);
