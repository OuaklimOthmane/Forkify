// import icons from "../../img/icons.svg"; // parcel 1
// import icons from "url:../../img/icons.svg"; // parcel 2

// import { Fraction } from "../../../../node_modules/fractional";

import View from "./View.js";
class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "could not find that recipe, please try another one !!";
  _message = "";

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--update-servings");
      if (!btn) return;

      //* getting number of servings from data attribute in buttons :
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerRender(handler) {
    //* Render the recipe when the hash has changed or the page has loaded.
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
            <span>${this._data.title}</span>
        </h1>
        </figure>

        <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to ="${
              this._data.servings - 1
            }">
                <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to ="${
              this._data.servings + 1
            }">
                <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
            </button>
            </div>
        </div>
        <div class="recipe__user-generated">
            
        </div>
        <button class="btn--round">
            <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
        </button>
        </div>

        <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join("")}
        </div>

        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
        </p>
        <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
        >
            <span>Directions</span>
            <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </a>
        </div>
    `;
  }

  _generateMarkupIngredient(ingredient) {
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ingredient.quantity ? ingredient.quantity.toFixed(2) : ""
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
            </div>
        </li>
                `;
  }
}

export default new RecipeView();

//? _______________________________________________________________
//! _______________________________________________________________
//* _______________________________________________________________

//! Solving problem of ingredient units :
//? To get a fractional number in the quantity of ingredients we can import the "fractional" package by :
// import { Fraction } from "../../../../node_modules/fractional";
//? then we set the variable to :
//? ${new Fraction(ingredient.quantity).toString()}

//! hashchange :
//? The "hashchange" event is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the # symbol)
