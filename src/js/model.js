import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

//* Loading recipe :
export const loadRecipe = async function (id) {
  //? This function will not return anything, instead it will change the "state" object. so it works 'cause there is a life connection between the exports and the imports, therefore when the "state" object gets updated by "loadRecipe()" then it will also updated in the controller which imports the state.

  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data; // recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log(`${error} ❗❗`);
    //? We want to handle the errors in "controller.js" not in "model.js" module,therefore we have to re-throw the error here, then the promise that will return from "loadRecipe()" will be rejected, then we will be able to handle the error in "controlRecipes()", so besically the error propagates down from the async function "loadRecipe()" to the other in "controlRecipes()" by re-throwing the error in the "catch" block.
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
