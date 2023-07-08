import { dom, loadTotal } from "./variaveisGlobais.js";
import buscaPokemons from "./pokemonFetch/buscaPokemons.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";
import toggleBtnsDisabled from "./dom/toggleBtnsDisabled.js";
import atualizaTotal from "./dom/alteraTotal.js";
import types from "./enums/typesEnum.js";

export default function initTypeMenu() {
  const typesBtn = document.querySelectorAll(".tipo");

  // Não foi usada function expression para possibilitar o uso do this
  async function changeTypeDisplay() {
    // Deleta os cards exibidos pelos outros tipos
    dom.deletaCardsPokemon();
    dom.criaCardLoading(loadTotal);
    // Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
    toggleBtnsDisabled();

    // Remove o data-menu="active" do tipo selecionado originalmente
    const selected = document.querySelector("[data-menu=active]");
    delete selected.dataset.menu;
    // Remove a cor do tipo selecionado originalmente
    selected.style.color = "#000";
    // Adiciona o data-menu="active" ao tipo selecionado
    this.dataset.menu = "active";

    // Busca os dados dos pokémons
    const { type } = this.dataset;
    const { results, count } = await buscaPokemons(loadTotal, 0, type);
    const pokemonData = await buscarDadosPokemons(results);

    /* Altera o valor do total de pokémons encontrados na seção. */
    atualizaTotal(count);
    /* Atualiza o valor do header do dropdown nas versões mobile e tablet */
    const dropdownHeader = document.querySelector("[data-dropdown-selected]");
    dropdownHeader.innerText = type;
    /* Atualiza a cor do texto do tipo selecionado para as versões desktop. */
    if (window.screen.width > 1024) this.style.color = types[type].color;

    // Deleta os cards de loading e gera os cards dos pokémons
    dom.deletaCardsLoading();
    pokemonData.forEach((item) => {
      dom.criaCard(item);
    });

    // Permite novamente que mais pokemons sejam carregados ou que o tipo exibido seja trocado
    toggleBtnsDisabled();
  }

  typesBtn.forEach((btn) => {
    btn.addEventListener("click", changeTypeDisplay);
  });
}
