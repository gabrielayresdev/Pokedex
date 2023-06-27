import loadMorePokemons from "./eventFunctions/loadMorePokemons.js";

export default function initLoadBtn() {
  const loadBtn = document.querySelector(".loadBtn");

  loadBtn.addEventListener("click", loadMorePokemons);
}
