/* const $URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonsNames = [];
let pokemonsExibidos = 0;
let pokemons; */

import { dom } from "./Dom.js";
import buscaPokemons from "./pokemonFetch/buscaPokemons.js";
import buscarDadosPokemons from "./pokemonFetch/buscarDadosPokemons.js";

/* 
  Função a ser resolvida

async function buscaDadosDeMultiplosPokemons(pokemons) {
  let start_time = new Date().getTime();
  console.log("Inicio: " + start_time);

  //

  let promises = [];
  let result = [];

  //

  pokemons.forEach((pokemon) => {
    promises.push(buscaDadoPokemon(pokemon.name));
  });

  console.log("promises: " + promises);

  const data = await Promise.all(promises);

  console.log("data: " + data);

  data.forEach((data) => {
    result = [...result, data];
  });

  //

  let end_time = new Date().getTime();
  console.log("fim: " + end_time);
} */

export const $URL = "https://pokeapi.co/api/v2/pokemon";
/* pokemonsNames => armazena o nome dos pokémons do tipo selecionado */
export let pokemonsNames = [];
/* pokemons => armazena os dados dos pokémons já exibidos */
export let pokemons;

export async function inicializaPag() {
  const { count, results } = await buscaPokemons(9, 0);
  pokemons = results;

  document.querySelector(".total-de-pokemons").innerText = `${count} Pokémon${
    count > 1 ? "s" : ""
  }`;

  const pokemonsDados = await buscarDadosPokemons(pokemons);

  pokemonsDados.forEach((dado) => {
    dom.criaCard(dado);
  });
}
