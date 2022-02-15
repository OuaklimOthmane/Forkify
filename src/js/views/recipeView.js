// import icons from "../../img/icons.svg"; //! parcel 1
// import icons from "url:../../img/icons.svg"; //! parcel 2

// import { Fraction } from "../../../../node_modules/fractional";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;

    //* Clear the markup :
    this._clear();

    //* Insert the new markup :
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
            <span>${this.#data.title}</span>
        </h1>
        </figure>

        <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
                <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
                <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
            </button>
            </div>
        </div>
        <div class="recipe__user-generated">
            <svg>
            <use href="src/img/icons.svg#icon-user"></use>
            </svg>
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
            ${this.#data.ingredients
              .map(this._generateMarkupIngredient)
              .join("")}
        </div>

        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
        </p>
        <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
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
              ingredient.quantity ? ingredient.quantity : ""
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

//? But now one thing is missing when working with a bundler that returns a bundle file, these are The icons.So remember that page which is displayed in the browser, is this code HTML  from "dist" folder.And therefore remember that all images and really all assets now come from this folder. And that includes icons. So our icons always come from of this "icon. svg file". But now the icons come from actually "icons96" in the "dist" folder. However, in our literal model, we always write,basically the old way to icons.SoJavaScript won't be able to find that.So in the "dist" folder, this one here there is no folder "source/image" in which there is "icons.svg" because it only exists in our source folder. So only here where we are developing the app.But one more times, we are already shipping the app.And so it uses data from that "dist" folder.And now we need a way to tell our JavaScript that the file of icons no longer "icon.svg" but rather "icons96.svg". And we can do it with "parcel" by simply importing the icon file. And again, in parcel we can import more than JavaScript files, We can import all kinds of assets and that includes images. So let's import them by just call it "icons".But this name can be anything we want From a alternate path to file of original icons, Now that's the way it worked in the first plot. So if for some reason you run "parcel 1", this is the way to go.
// import icons from "../img/icons.svg";

//? But in the second "parcel 2", it works almost the same way. But then for all assets static files that are not programming files. Thus, for any image, video or similar audio file, we need to write "url:" then the file path.
// import icons from "url:../img/icons.svg";
//?  So wherever we have this ancient path, now we just want to replace it with the "icons".

//? To get a fractional number in the quantity of ingredients we can import the "fractional" package by :
// import { Fraction } from "../../../../node_modules/fractional";
//? then we set the variable to :
//? ${new Fraction(ingredient.quantity).toString()}
