import { $URL } from "../initPage.js";

/* 
limit = numero de pokemons buscados
offset = numero de pokemons excluidos da busca
type = tipo de pokémon a ser buscado

type = "All" -> não busca por nenhum tipo em específico

Recebe limit, offset e type como parâmetros e retorna lista com [limit] pokémons do tipo [type] a partir do [offset] pokémon
*/
export default async function buscaPokemons(limit, offset, type) {
  //url deve conter ambos os parametros ou não deve ter nenhum
  //https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0

  let url;
  if (type === "All") {
    url = `${$URL}/${
      limit != undefined && offset != undefined
        ? `?limit=${limit}&offset=${offset}/`
        : ""
    }`;
  } else {
    url = `https://pokeapi.co/api/v2/type/${type}`;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();

    /* Se certifica que o retorno segue o mesmo padrão independente do valor de type */
    if (type === "All") {
      return json;
    } else {
      const retorno = {};
      retorno.count = json.pokemon.length;
      retorno.results = json.pokemon
        .slice(offset, offset + limit)
        .map((item) => {
          return item.pokemon;
        });

      return retorno;
    }
  } catch (error) {
    console.error(`Could not get pokémons: ${error}`);
  }
}
