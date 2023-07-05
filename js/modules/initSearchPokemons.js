import { pokemonsNames } from "./initPage.js";
import { Dom } from "./dom/Dom.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";

export let filtrados = [];

export function initSearchPokemons() {
  const searchBar = document.querySelector("[data-search]");

  async function handleInput() {
    const pokemonsArea = document.querySelector(".pokemons");
    const searchArea = document.querySelector(".pokemons-search");
    if (this.value.length > 0) {
      searchArea.classList.add("active");
      pokemonsArea.classList.remove("active");

      const regexp = new RegExp(`${this.value}`, "gi");

      filtrados = pokemonsNames.filter(({ name }) => {
        if (regexp.test(name)) {
          return name;
        }
      });

      const searchDom = new Dom(".pokemons-search");

      const list = filtrados.length > 9 ? filtrados.slice(0, 9) : filtrados;

      searchDom.criaCardLoading(list.length);
      searchDom.deletaCardsPokemon();

      const pokemonsData = await buscarDadosPokemons(list);

      pokemonsData.forEach((item) => {
        searchDom.criaCard(item);
      });

      searchDom.deletaCardsLoading();
    } else if (this.value.length === 0) {
      pokemonsArea.classList.add("active");
      searchArea.classList.remove("active");
    }
  }
  searchBar.addEventListener("input", handleInput);
}
