class SearchView {
  #parentElement = document.querySelector("form");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this.#parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
