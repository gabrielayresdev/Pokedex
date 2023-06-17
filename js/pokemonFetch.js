const $URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonsNames = [];
let pokemonsExibidos = 0;
let pokemons;

const dom = new Dom(".pokemons");

/* 
Limit = numero de pokemons buscados
offSet = numero de pokemons excluidos da busca

retorna lista com (limit) pokémons a partir do (offset) pokémon
*/
async function buscaPokemons(limit, offset) {
  //url deve conter ambos os parametros ou não deve ter nenhum
  //https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0

  const url = `${$URL}/${
    limit != undefined && offset != undefined
      ? `?limit=${limit}&offset=${offset}/`
      : ""
  }`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    pokemonsExibidos = limit + offset;

    return json;
  } catch (error) {
    console.error(`Could not get pokémons: ${error}`);
  }
}

async function buscaDadoPokemon(name) {
  const url = `${$URL}/${name}/`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(`Could not get pokémons: ${error}/`);
  }
}

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

async function buscarDadosPokemons(pokemons) {
  const dadosPokemons = [];

  for (const pokemon of pokemons) {
    const dados = await buscaDadoPokemon(pokemon.name);
    dadosPokemons.push(dados);
  }

  return dadosPokemons;
}

async function incializaPag() {
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
incializaPag();
