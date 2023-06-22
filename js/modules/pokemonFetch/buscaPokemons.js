import { $URL } from "../initPage.js";

/* 
Limit = numero de pokemons buscados
offSet = numero de pokemons excluidos da busca

retorna lista com (limit) pokémons a partir do (offset) pokémon
*/
export default async function buscaPokemons(limit, offset) {
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

    return json;
  } catch (error) {
    console.error(`Could not get pokémons: ${error}`);
  }
}
