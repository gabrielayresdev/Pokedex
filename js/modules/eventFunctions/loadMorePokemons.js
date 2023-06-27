import buscarDadosPokemons from "../pokemonFetch/buscarDadosPokemons.js";
import buscaPokemons from "../pokemonFetch/buscaPokemons.js";
import { dom } from "../dom/Dom.js";

export default function initLoadBtn() {
  const loadBtn = document.querySelector(".loadBtn");

  loadBtn.addEventListener("click", loadMorePokemons);
}

async function loadMorePokemons() {
  dom.criaCardLoading(9);

  const { results } = await buscaPokemons(
    9,
    document.querySelectorAll(".pokemon").length
  );
  const pokemonsData = await buscarDadosPokemons(results);

  dom.deletaCardsLoading();

  pokemonsData.forEach((item) => {
    dom.criaCard(item);
  });
}
