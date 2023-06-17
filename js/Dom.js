function Dom(seletor) {
  this.element = document.querySelector(seletor);
}

Dom.prototype.criaCard = function (pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const img = pokemon.sprites.other.dream_world.front_default
    ? pokemon.sprites.other.dream_world.front_default
    : pokemon.sprites.other["official-artwork"].front_default;

  card.innerHTML = `
         <div class="pokemon--img">
            <img
            src="${img}"
            alt="Foto do ${pokemon.name}"
            />
         </div>
         <p class="pokemon--numero">${pokemon.id}</p>
         <span>
            <p class="pokemon--nome">${pokemon.name}</p>
            <img src="img/types/grass.svg" />
         </span>
  `;

  this.element.appendChild(card);
};
