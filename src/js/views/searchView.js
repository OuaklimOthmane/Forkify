class searchView {
  #parentElement = document.querySelector(".form");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
  }
}

export default new searchView();
