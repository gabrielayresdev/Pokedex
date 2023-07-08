import buscaDadoPokemon from "./buscaDadoPokemon.js";

/* Faz múltiplas requisições dos dados dos pokémons através da função buscaDadoPokemon e retorna um array com os dados adquiridos */
export default async function buscarDadosPokemons(pokemons) {
  // Fetch realizado paralelamente.
  const promises = [];
  const result = [];

  for (const pokemon of pokemons) {
    promises.push(buscaDadoPokemon(pokemon.name));
  }
  const data = await Promise.all(promises);
  data.forEach((dados) => {
    result.push(dados);
  });

  // Busca em fila dos dados do pokémons. Aproximadamente 5 a 7 vezes mais demorada que a busca paralela.
  /* for (const pokemon of pokemons) {
    const dados = await buscaDadoPokemon(pokemon.name);
    dadosPokemons.push(dados);
  } */

  return result;
}
