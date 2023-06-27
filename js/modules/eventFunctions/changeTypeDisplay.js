import { dom } from "../dom/Dom.js";
import buscaPokemons from "../pokemonFetch/buscaPokemons.js";
import buscarDadosPokemons from "../pokemonFetch/buscarDadosPokemons.js";
import toggleBtnsDisabled from "../dom/toggleBtnsDisabled.js";

export default async function changeTypeDisplay() {
  dom.deletaCardsPokemon();
  dom.criaCardLoading(9);
  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();

  //remove o data-menu="active" do tipo selecionado originalmente
  const selected = document.querySelector("[data-menu=active]");
  delete selected.dataset.menu;
  //adiciona o data-menu="active" ao tipo selecionado
  this.dataset.menu = "active";

  const type = this.dataset.type;
  const { results, count } = await buscaPokemons(9, 0, type);
  const pokemonData = await buscarDadosPokemons(results);

  /* Altera o valor do total de pokémons encontrados na seção. */
  document.querySelector(".total-de-pokemons").innerText = `${count} Pokémon${
    count > 1 ? "s" : ""
  }`;

  dom.deletaCardsLoading();
  pokemonData.forEach((item) => {
    dom.criaCard(item);
  });

  //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();
}
