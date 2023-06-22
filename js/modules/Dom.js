import { formataNumero } from "./textFormat/textFormat.js";
import { types } from "./typesEnum.js";

export function Dom(seletor) {
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
         <p class="pokemon--numero">${formataNumero(pokemon.id)}</p>
         <span>
            <p class="pokemon--nome">${pokemon.name}</p>
            <img src="img/types/grass.svg" />
         </span>
  `;

  card.addEventListener("click", () => {
    const body = new Dom("body");
    body.criaModal(pokemon);
  });

  this.element.appendChild(card);
};

Dom.prototype.criaModal = function (pokemon) {
  const section = document.createElement("section");
  section.classList.add("modal-container");
  section.dataset.modal = "container";

  const name = pokemon.name;
  const id = pokemon.id;
  const img = pokemon.sprites.other.dream_world.front_default
    ? pokemon.sprites.other.dream_world.front_default
    : pokemon.sprites.other["official-artwork"].front_default;
  const tipos =
    pokemon.types.length === 1
      ? [pokemon.types[0].type.name]
      : [pokemon.types[0].type.name, pokemon.types[1].type.name];

  const weakness = tipos.reduce((acumulador, tipo) => {
    const weak = types[`${tipo}`].weakness;
    return acumulador.concat(weak).filter((item, pos, arr) => {
      return arr.indexOf(item) === pos;
    });
  }, []);

  const bg = "../../img/" + types[`${pokemon.types[0].type.name}`].modalBg;

  const height = pokemon.height;
  const weight = pokemon.weight;
  const ability = pokemon.abilities[0].ability.name;

  const stats = [];

  pokemon.stats.forEach((stat, index) => {
    stats[index] = [stat.stat.name, stat.base_stat];
  });

  console.log(stats);

  section.innerHTML = `
  <div class="modal">
  <button class="fechar" data-modal="fechar">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <div class="modal-content">
    <div class="modal-image" style="background-image: url('${bg}');">
      <img src="${img}" alt="Foto do pokémon ${pokemon.name}" />
    </div>
    <div class="modal-data">
      <span>
        <h3 class="modal-name">${name}</h3>
        <p class="modal-number">${formataNumero(id)}</p>
      </span>
      <span>
      ${tipos
        .map((tipo) => {
          return `<p class="modal-type" style="background-color: ${
            types[`${tipo}`].bgColor
          }; color: ${types[`${tipo}`].color}">${tipo}</p>`;
        })
        .join("")}
    
      </span>
      <dl class="modal-caracteristicas">
        <dt>Height</dt>
        <dd>${height}</dd>
        <dt>Weight</dt>
        <dd>${weight}</dd>
        <dt>Abilities</dt>
        <dd>${ability}</dd>
      </dl>
      <div>
        <h3 class="weakness-title">Weakness</h3>
        <div class="weakness-flexbox">
          
          ${weakness
            .map((item) => {
              const { bgColor, color } = types[`${item}`];

              return `<p class="modal-type" style="background-color: ${bgColor}; color: ${color}">${item}</p>`;
            })
            .join("")}
        </div>
      </div>

      <div class="stats">
        <h3 class="stats-title">Stats</h3>
        ${stats
          .map((item) => {
            return `<p class="stats-head">${item[0]}</p>
            <div class="stats-bar--container" style="background: linear-gradient(to right, red ${item[1]}%, #ddd 0%);">
              <span></span><span></span><span></span><span></span>
            </div>`;
          })
          .join("")}
        
      </div>
    </div>
  </div>
</div>

  `;

  const fechar = section.querySelector('[data-modal="fechar"]');

  function deletaModal({ target }) {
    if (target === section) {
      window.removeEventListener("click", deletaModal);
      section.parentNode.removeChild(section);
    }
  }

  /* Eventos para fechar o modal */

  /* Otimizar removendo evento no fechar */
  fechar.addEventListener("click", () => {
    window.removeEventListener("click", deletaModal);
    section.parentNode.removeChild(section);
  });
  window.addEventListener("click", deletaModal);

  this.element.appendChild(section);
};

export const dom = new Dom(".pokemons");
