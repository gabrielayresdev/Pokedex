import buscaDadoPokemon from "./buscaDadoPokemon.js";

export default async function buscarDadosPokemons(pokemons) {
  const dadosPokemons = [];

  for (const pokemon of pokemons) {
    const dados = await buscaDadoPokemon(pokemon.name);
    dadosPokemons.push(dados);
  }

  return dadosPokemons;
}
