/* Altera o valor do total de pokémons encontrados na seção. */
export default function atualizaTotal(valor) {
  document.querySelector(".total-de-pokemons").innerText = `${valor} Pokémon${
    valor > 1 ? "s" : ""
  }`;
}
