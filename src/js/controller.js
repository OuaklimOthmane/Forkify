// import "core-js/stable";
// import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

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
    console.log(`${error} ❗❗❗ `);
    //* Render error message :
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //* Get query recipe :
    const query = searchView.getQuery();
    if (!query) return;

    //* Load search results :
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (error) {
    console.log(`${error}`);
  }
};

//* Handling events using the "Publisher-Subscriber" pattern :
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();

//? _______________________________________________________________
//! _______________________________________________________________
//* _______________________________________________________________

//! Dealing with event handlers in MVC :
//? we're listening to the "hashchange" & "load" events in the controller which does not make sense, because everything that is related to the DOM (the view) should really be inside of a view,so therefore we need a way of putting this logic in the "recipeView.js", however the handler function that we use to handle these evens is actually "controller.js" inside the controller module, and so that a problem 'cause we don't want these handlers in the controller instead we want them in the "recipeView.js", but in this code we need the "controlRecipes" function in the controller but we don't put it in the "recipeView.js".
//? So as a recap of the problem, events should be handled in the controller (otherwise we would have application logic in the view), and the other hand, events should be listened for in the view (otherwise we would need DOM elements in the controller) and we would besicallly have presentation logic in the controller which would be wrong in our MVC implementation. so essentially, event liseners should be attached to DOM elements in the view, but the events should then be handled by controller functions that live in the controller module.
//? So if we take a look at the architecture diagram, we have the "controlRecipes()" in the controller and we have a special method in the view which is called "addHandlerRender()", now we might think that is very easy to connect these two functions, because why not simply import the "controlRecipes()" function right from the view whenever an event occurs ? well that actually not possible because an a way we set up the architecture the view does not know anything about the controller so it doen't import the controller and so we can't call any of the functions that are in the controller from the view, so only works the other way around, but fortunately theree is a good solution which called "The Publisher-Subscriber Design pattern".
//? So in the "Publisher-Subscriber" pattern we have a publisher which is some code that knows when to react and in this case is going to be the "addHandlerRender()" function because it will contain the addEventlistener method and therefore it will know when to react to the event, on the hand, we have a Subscriber which is code that actually wants to react so this is the code that should be executed when the event happens and in this case is the "controlRecipes()" function that we have in the controller, and remember that the publisher does not know yet that the subscriber even exists because this last is in the controller that the view can't access.
//? So the solution to the problem, that we can now subscribe to the publisher by passing into subscriber function as an argument.
//? so in practice that means that as soon as the program loads, the "init()" function is called which in turn immediately calls the "addHandlerRender()" function from the view and it's possible because the controller does in fact import both the view and the model, then as we call this last function we pass in the "controlRecipes()" function as an argument, so essentially we subscribe "controlRecipes()" to "addHandlerRender()", so at this point, the two functions are besically connected, and so now "addHandlerRender()" listens for events using the addEventListener method as always and then as soon as the event actually happens, the "controlRecipes()" function will be called as the callback function of addEventListener, or on other words, as soon as the publisher publishes an event the subscriber will get called, and this we implement event handlers in MVC architecture, so this will alows us to keep the handler in the controller and the listeners in the view
