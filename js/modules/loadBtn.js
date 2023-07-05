import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";
import buscaPokemons from "./pokemonFetch/buscaPokemons.js";
import Dom from "./dom/Dom.js";
import toggleBtnsDisabled from "./dom/toggleBtnsDisabled.js";
import { filtrados } from "./variaveisGlobais.js";
import { dom, loadTotal } from "./variaveisGlobais.js";

export default function initLoadBtn() {
  const loadBtn = document.querySelector(".loadBtn");
  const loadMorePokemons = async () => {
    //Deleta os cards de loading
    dom.criaCardLoading(loadTotal);
    //Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
    toggleBtnsDisabled();

    //verifica quantos pokémons já foram exibidos
    const numeroDePokemonsExibidos =
      document.querySelectorAll(".active .pokemon").length;

    /* Como existem duas fontes de nomes de pokémons, a Api e o Array com todos os nomes dos pokémons, a variável pokemonsAreBeingSearched serve para verificar de onde serão extraidos os dados */
    const pokemonsAreBeingSearched = document.querySelectorAll(
      ".pokemons-search.active"
    ).length;

    /* Se houver busca por nome, o Array filtrados será usado como fonte */
    if (pokemonsAreBeingSearched) {
      //armazena uma nova array com os pokémons que serão carregados.
      const list = filtrados.slice(
        numeroDePokemonsExibidos,
        numeroDePokemonsExibidos + loadTotal
      );

      //Faz a requisição dos dados dos novos pokémons
      const pokemonsData = await buscarDadosPokemons(list);
      /* Cria os cards*/
      pokemonsData.forEach((item) => {
        new Dom(".pokemons-search").criaCard(item);
      });
    } else {
      const type = document.querySelector("[data-menu=active]").dataset.type;
      const { results } = await buscaPokemons(
        loadTotal,
        numeroDePokemonsExibidos,
        type
      );
      //Faz a requisição dos dados dos novos pokémons
      const pokemonsData = await buscarDadosPokemons(results);
      /* Cria os cards*/
      pokemonsData.forEach((item) => {
        dom.criaCard(item);
      });
    }

    //Deleta os cards de loading
    dom.deletaCardsLoading();
    //permite novamente que mais pokemons sejam carregados ou que o tipo exibido seja trocado
    toggleBtnsDisabled();
  };

  loadBtn.addEventListener("click", loadMorePokemons);
}
