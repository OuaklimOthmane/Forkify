// import "core-js/stable";
// import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//! /////////////////////////////////////

const controlRecipes = async function () {
  try {
    //* Get the id of the recipe from the url :
    const id = window.location.hash.slice(1);

    if (!id) return;

    //* Render spinner :
    recipeView.renderSpinner();

    //* Loading recipe :
    //? loadRecipe() is an async function so it will return a promise, therefore we have to await this last
    await model.loadRecipe(id);
    // const { recipe } = model.state; // recipe = model.state.recipe;

    //* Rendering recipe :
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

//* Rendering recipe with ID :
//? The "hashchange" event is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the # symbol)
//? Render the recipe when the hash has changed or the page has loaded.
// window.addEventListener("haschange", showRecipe);
// window.addEventListener("load", showRecipe);
// or :
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);
