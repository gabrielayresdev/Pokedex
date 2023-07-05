import buscarDadosPokemons from "../pokemonFetch/buscarDadosPokemons.js";
import buscaPokemons from "../pokemonFetch/buscaPokemons.js";
import { Dom, dom } from "../dom/Dom.js";
import toggleBtnsDisabled from "../dom/toggleBtnsDisabled.js";
import { pokemonsNames } from "../initPage.js";
import { filtrados } from "../initSearchPokemons.js";

//loadMorePokemons pode ou não receber uma lista como parâmetro. Caso receba, irá carregar mais pokémons dessa lista. Caso contrário, irá carregar através da Api.
export default async function loadMorePokemons() {
  dom.criaCardLoading(9);
  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();

  const pokemonsAreBeingSearched = document.querySelectorAll(
    ".pokemons-search.active"
  ).length;

  if (pokemonsAreBeingSearched) {
    const list = filtrados.slice(
      document.querySelectorAll(".active .pokemon").length,
      9
    );

    const pokemonsData = await buscarDadosPokemons(list);
    pokemonsData.forEach((item) => {
      const search = new Dom(".pokemons-search");
      search.criaCard(item);
    });
  } else {
    const type = document.querySelector("[data-menu=active]").dataset.type;
    const { results } = await buscaPokemons(
      9,
      document.querySelectorAll(".active .pokemon").length,
      type
    );

    const pokemonsData = await buscarDadosPokemons(results);
    pokemonsData.forEach((item) => {
      dom.criaCard(item);
    });
  }

  dom.deletaCardsLoading();
  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();
}
