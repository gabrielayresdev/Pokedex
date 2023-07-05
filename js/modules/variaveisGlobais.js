import Dom from "./dom/Dom.js";

/* pokemonsNames => armazena o nome dos pokémons do tipo selecionado */
export let pokemonsNames = [];
export function setPokemonsNames(value) {
  pokemonsNames = value;
}

// filtrados => armazena os nomes que foram testados pelo regex da busca
export let filtrados = [];
export function setFiltrados(value) {
  filtrados = value;
}

// Objeto que irá manipular a seção responsável por exibir os pokémons
export const dom = new Dom(".pokemons");

// Total de pokemons por página.
export const loadTotal = 9;
