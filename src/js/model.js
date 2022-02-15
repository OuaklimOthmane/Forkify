import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
};

//* Loading recipe :
export const loadRecipe = async function (id) {
  //? This function not gonna return anything, instead it will change the "state" object. so it works 'cause there is a life connection between the exports and the imports, therefore when the "state" object gets updated by "loadRecipe()" then it will also updated in the controller which imports the state.

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
    alert(error);
  }
};
