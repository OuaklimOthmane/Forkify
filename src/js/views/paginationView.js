// import icons from "../../img/icons.svg"; // parcel 1
// import icons from "url:../../img/icons.svg"; // parcel 2

import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    //* Using event delegation :
    this._parentElement.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //* Page 1, and there're other pages :
    if (currentPage === 1 && numberPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
               <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    //* Last page :
    if (currentPage === numberPages && numberPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
               <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    //* other pages :
    if (currentPage < numberPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
               <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
               <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    //* Page 1, and there're NO other pages :
    return "";
  }
}

export default new PaginationView();
