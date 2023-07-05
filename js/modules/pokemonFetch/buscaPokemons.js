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

  //path padrão para toda requisição de pokémons da Api
  const path = "https://pokeapi.co/api/v2/pokemon";

  let url;
  if (type === "All") {
    //Se houver limit e offset, eles serão usados no endpoint. Caso não haja um dos dois, nenhum dos dois será usado como parâmetro.
    const parametros =
      limit != undefined && offset != undefined
        ? `?limit=${limit}&offset=${offset}/`
        : "";

    url = `${path}/${parametros}`;
  } else {
    url = `https://pokeapi.co/api/v2/type/${type}`;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();

    /* 
    Se certifica que o retorno segue o mesmo padrão independente do valor de type ==>
    {
      count: retorna o número de pokémons retornados
      results: retorna uma array com objetos {name, url}
    }
    */
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
    //ADICIONAR FEATURE
    console.error(`Could not get pokémons: ${error}`);
  }
}

//Parcialmente otimizado
