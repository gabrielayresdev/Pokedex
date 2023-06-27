import buscarDadosPokemons from "../pokemonFetch/buscarDadosPokemons.js";
import buscaPokemons from "../pokemonFetch/buscaPokemons.js";
import { dom } from "../dom/Dom.js";
import toggleBtnsDisabled from "../dom/toggleBtnsDisabled.js";

export default async function loadMorePokemons() {
  dom.criaCardLoading(9);
  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();

  const type = document.querySelector("[data-menu=active]").dataset.type;

  const { results } = await buscaPokemons(
    9,
    document.querySelectorAll(".pokemon").length,
    type
  );

  const pokemonsData = await buscarDadosPokemons(results);

  dom.deletaCardsLoading();

  pokemonsData.forEach((item) => {
    dom.criaCard(item);
  });
  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();
}
