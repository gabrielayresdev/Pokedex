import { $URL } from "../initPage.js";

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
