export const state = {
  recipe: {},
};

//* Loading recipe :
export const loadRecipe = async function (id) {
  //? This function not gonna return anything, instead it will change the "state" object. so it works 'cause there is a life connection between the exports and the imports, therefore when the "state" object gets updated by "loadRecipe()" then it will also updated in the controller which imports the state.

  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

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
    console.table(state.recipe);
  } catch (error) {
    alert(error);
  }
};
