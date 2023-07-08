import Dom from "./dom/Dom.js";
import buscaDadoPokemon from "./pokemonFetch/buscaDadoPokemon.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";
import {
  getFiltrados,
  loadTotal,
  getPokemonsNames,
  setFiltrados,
} from "./variaveisGlobais.js";

export default function initSearchPokemons() {
  const searchBar = document.querySelector("[data-search]");

  async function handleInput() {
    // Variáveis que apontam para as divs que armazenam os cards dos pokámons buscados e dos pokémons exibidos normalmente
    const pokemonsArea = document.querySelector(".pokemons");
    const searchArea = document.querySelector(".pokemons-search");
    if (this.value.length > 0) {
      // Se houver algo sendo pesquisado, a área .pokemons será omitida e a área .pokemons-search será exibida
      searchArea.classList.add("active");
      pokemonsArea.classList.remove("active");

      // Cria um novo objeto do tipo dom para fazer a manipulação da seção pokemons-search
      const searchDom = new Dom(".pokemons-search");

      // Sequência lógia para input do nome
      if (Number.isNaN(Number(this.value))) {
        const regexp = new RegExp(`${this.value}`, "gi");

        // retorna os pokémos que possuem this.value em qualquer parte do nome para a variável filtrados
        setFiltrados(
          getPokemonsNames().filter(({ name }) => regexp.test(name))
        );

        // Retorna apenas o numero padrão de pokémons exibidos por página
        const list = getFiltrados().slice(0, loadTotal);

        // Cria os cards de loading, deleta os cards da busca anterior, pega os dados dos pokémons, cria os cards dos pokémons e deleta os cards de loading.
        searchDom.criaCardLoading(list.length);
        searchDom.deletaCardsPokemon();
        const pokemonsData = await buscarDadosPokemons(list);
        pokemonsData.forEach((item) => {
          searchDom.criaCard(item);
        });
        searchDom.deletaCardsLoading();
      } else {
        const numero = Number(this.value);
        const pokemonData = await buscaDadoPokemon(numero);

        searchDom.criaCardLoading(1);
        searchDom.deletaCardsPokemon();
        searchDom.criaCard(pokemonData);
        searchDom.deletaCardsLoading();
      }
    } else if (this.value.length === 0) {
      // Se houver algo sendo pesquisado, a área .pokemons será exibida e a área .pokemons-search será omitida
      pokemonsArea.classList.add("active");
      searchArea.classList.remove("active");
    }
  }
  searchBar.addEventListener("input", handleInput);
}
