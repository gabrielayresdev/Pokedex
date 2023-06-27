import { dom } from "./dom/Dom.js";
import buscaPokemons from "./pokemonFetch/buscaPokemons.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";

/* path padrão para toda requisição da Api */
export const $URL = "https://pokeapi.co/api/v2/pokemon";
/* pokemonsNames => armazena o nome dos pokémons do tipo selecionado */
export let pokemonsNames = [];
/* pokemons => armazena os nomes e a url da api referente aos pokémons já exibidos */
export let pokemons;

/* Inicializa a página procurando pelos dados de 9 pokémons e cria seus cards. Enquanto a requisição a Api não é resolvida, exibe 9 cards de loading no lugar dos cards de pokémons */
export async function inicializaPag() {
  /* Cria os cards de loading */
  dom.criaCardLoading(9);

  /* Faz a requisição dos nomes dos pokémons. */
  const { count, results } = await buscaPokemons(9, 0);

  /* Altera o valor do total de pokémons encontrados na seção. */
  document.querySelector(".total-de-pokemons").innerText = `${count} Pokémon${
    count > 1 ? "s" : ""
  }`;

  /* Faz a requisição dos dados dos pokémons. */
  const pokemonsData = await buscarDadosPokemons(results);

  /* Remove os cards de loading */
  dom.deletaCardsLoading();

  /* Cria os cards com os dados obtidos */
  pokemonsData.forEach((dado) => {
    dom.criaCard(dado);
  });
}
