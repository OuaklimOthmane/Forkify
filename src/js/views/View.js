// import icons from "../../img/icons.svg"; //! parcel 1
// import icons from "url:../../img/icons.svg"; //! parcel 2

export default class View {
  _data;

  render(data) {
    this._data = data;

    //* Clear the markup :
    this._clear();

    //* Insert the new markup :
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
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
//? But now one thing is missing when working with a bundler that returns a bundle file, these are The icons.So remember that page which is displayed in the browser, is this code HTML  from "dist" folder.And therefore remember that all images and really all assets now come from this folder. And that includes icons. So our icons always come from of this "icon. svg file". But now the icons come from actually "icons96" in the "dist" folder. However, in our literal model, we always write,basically the old way to icons.SoJavaScript won't be able to find that.So in the "dist" folder, this one here there is no folder "source/image" in which there is "icons.svg" because it only exists in our source folder. So only here where we are developing the app.But one more times, we are already shipping the app.And so it uses data from that "dist" folder.And now we need a way to tell our JavaScript that the file of icons no longer "icon.svg" but rather "icons96.svg". And we can do it with "parcel" by simply importing the icon file. And again, in parcel we can import more than JavaScript files, We can import all kinds of assets and that includes images. So let's import them by just call it "icons".But this name can be anything we want From a alternate path to file of original icons, Now that's the way it worked in the first plot. So if for some reason you run "parcel 1", this is the way to go.
// import icons from "../img/icons.svg";

//? But in the second "parcel 2", it works almost the same way. But then for all assets static files that are not programming files. Thus, for any image, video or similar audio file, we need to write "url:" then the file path.
// import icons from "url:../img/icons.svg";
//?  So wherever we have this ancient path, now we just want to replace it with the "icons".
