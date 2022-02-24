// import icons from "../../img/icons.svg"; // parcel 1
// import icons from "url:../../img/icons.svg"; // parcel 2

export default class View {
  _data;

  render(data) {
    //* Checking the result data :
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    //* Clear the markup :
    this._clear();

    //* Insert the new markup :
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    //? Update only text and attributes in the DOM without having to re-render the entire view.
    //* Checking the result data :
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    //* Create a virtual DOM to compare based on "newMarkup" :
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //* Select all the elements on the new DOM :
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    //* Select all the elements on the actual DOM :
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      //* Update changed TEXT :
      if (
        !newElement.isEqualNode(
          currentElement && newElement.firstChild?.nodeValue.trim() !== ""
        )
      ) {
        currentElement.textContent = newElement.textContent;
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
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
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
              <p>${message}</p>
         </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
         <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
              <p>${message}</p>
         </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

//? _______________________________________________________________
//! _______________________________________________________________
//* _______________________________________________________________

//! Solving problem of displaying icons :
//? But now one thing is missing when working with a bundler that returns a bundle file, these are The icons.So remember that page which is displayed in the browser, is this code HTML  from "dist" folder.And therefore remember that all images and really all assets now come from this folder. And that includes icons. So our icons always come from of this "icon. svg file". But now the icons come from actually "icons96" in the "dist" folder. However, in our literal model, we always write,basically the old way to icons.So JavaScript won't be able to find that. So in the "dist" folder, this one here there is no folder "src/image" in which there is "icons.svg" because it only exists in our "src" folder. So only here where we are developing the app.But one more times, we are already shipping the app.And so it uses data from that "dist" folder.And now we need a way to tell our JavaScript that the file of icons no longer "icon.svg" but rather "icons96.svg". And we can do it with "parcel" by simply importing the icon file. And again, in parcel we can import more than JavaScript files, We can import all kinds of assets and that includes images. So let's import them by just call it "icons".But this name can be anything we want From a alternate path to file of original icons, Now that's the way it worked in the first plot. So if for some reason you run "parcel 1", this is the way to go.
// import icons from "../img/icons.svg";

//? But in the second "parcel 2", it works almost the same way. But then for all assets static files that are not programming files. Thus, for any image, video or similar audio file, we need to write "url:" then the file path.
// import icons from "url:../img/icons.svg";
//?  So wherever we have this ancient path, now we just want to replace it with the "icons".

//! Developing a DOM updating algorithm :
//? we will update places only in places where it actually changed, and that's neccessary because in our case when we udate the servings then it will always besicaly re-render the entire view recipe, and we can see some flickerings around the page everytime we would have updated the servings then besically re-load the image which would then leads to a short flicker, and having to re-render the entire view recipe which means all these HTML elements is actually a bit iverkill and will put too much strain on the browser so it will create unneccessary work, and so therefore we will create an update method that we can use in this situation.
//? Solution : "update()" will create a new markup but not to render it, so instead, all that we're gonna do is to generate this markup and then compare that new HTML to the current HTML, and then we only change text and attributes that actually have changed from the old version to the new one.
//? steps : So now we have the "newMarkup" markup as a string which will be very difficult to compare to the DOM elements that we currently have on the page, and so to fix that problem we can actually use a method which besiclly convert this markup string to a DOM object that's living in the memory and we can then use to compare with the actual DOM that's on the page, so we create this new DOM by using " document.createRange().createContextualFragment(newMarkup) " which then convert "newMarkup" markup into a real DOM node object, so "newDOM" will be like a virtual DOM which not really living on the page but in our memory. so then we will able to only change what happened from the new DOM with the actual current DOM which we have on the page. so in order to be able to do this comparaison we now need all the actual elements that are currently on the page using "document.querySelectorAll("*") " which returns a NodeList which we need to convert it to an array using "Array.from()", then we will loop over this array and compare each node to the virtual node by using "newElement.isEqualNode(currentElement)"
