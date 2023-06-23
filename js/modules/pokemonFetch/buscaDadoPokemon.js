import { $URL } from "../initPage.js";

/* Recebe o nome/id de um pokémon e retorna um JSON com os dados do pokémon. Os dados disponíveis são: abilities, base_experience, forms, game_indices, height, held_items, id, is_default, location_area_encounters, moves, name, order, past_types, species, sprites, stats, types, weight */
export default async function buscaDadoPokemon(name) {
  const url = `${$URL}/${name}/`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(`Could not get pokémons: ${error}/`);
  }
}
