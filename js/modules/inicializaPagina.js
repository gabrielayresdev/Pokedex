import atualizaTotal from "./dom/alteraTotal.js";
import toggleBtnsDisabled from "./dom/toggleBtnsDisabled.js";
import buscaPokemons from "./pokemonFetch/buscaPokemons.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";
import { dom, loadTotal, setPokemonsNames } from "./variaveisGlobais.js";

const getNomesDosPokemons = (lista) => {
  const names = lista.map(({ name }) => ({ name }));
  return names;
};

/* Inicializa a página procurando pelos dados de {loadTotal} pokémons e cria seus cards. Enquanto a requisição a Api não é resolvida, exibe {loadTotal} cards de loading no lugar dos cards de pokémons */
export default async function inicializaPag() {
  /* Cria os cards de loading */
  dom.criaCardLoading(loadTotal);
  // Impede que mais pokemons sejam carregados ou que o tipo exibido seja trocado enquanto os cards requisitados não forem carregado
  toggleBtnsDisabled();

  /* Faz a requisição dos nomes dos pokémons. */
  const { count, results } = await buscaPokemons(10000, 0, "All");

  // Guarda na variável pokemonNames todos os nomes de pokémons da Api
  setPokemonsNames(getNomesDosPokemons(results));

  /* Altera o valor do total de pokémons encontrados na seção. */
  atualizaTotal(count);

  /* Faz a requisição dos dados de {loadTotal} pokémons. */
  const pokemonsData = await buscarDadosPokemons(results.slice(0, loadTotal));

  /* Remove os cards de loading */
  dom.deletaCardsLoading();
  // Permite novamente que mais pokemons sejam carregados ou que o tipo exibido seja trocado
  toggleBtnsDisabled();

  /* Cria os cards com os dados obtidos */
  pokemonsData.forEach((dado) => {
    dom.criaCard(dado);
  });
}
