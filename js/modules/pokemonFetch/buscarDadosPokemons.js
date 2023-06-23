import buscaDadoPokemon from "./buscaDadoPokemon.js";

/* Faz múltiplas requisições dos dados dos pokémons através da função buscaDadoPokemon e retorna um array com os dados adquiridos */
export default async function buscarDadosPokemons(pokemons) {
  const dadosPokemons = [];

  for (const pokemon of pokemons) {
    const dados = await buscaDadoPokemon(pokemon.name);
    dadosPokemons.push(dados);
  }

  return dadosPokemons;
}
