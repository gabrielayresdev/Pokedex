import { formataNumero } from "../textFormat/textFormat.js";
import { types } from "../enums/typesEnum.js";

export function Dom(seletor) {
  this.element = document.querySelector(seletor);
}

/* Cria o card de pokémon e adiciona seus eventListener */
Dom.prototype.criaCard = function (pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  /*   const img = pokemon.sprites.other.dream_world.front_default
    ? pokemon.sprites.other.dream_world.front_default
    : pokemon.sprites.other["official-artwork"].front_default; */
  const img = pokemon.sprites.other["official-artwork"].front_default
    ? pokemon.sprites.other["official-artwork"].front_default
    : pokemon.sprites.other.dream_world.front_default;

  //garante que nenhum card sem imagem será criado
  if (img === null) {
    return null;
  }

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

/* Deleta os cards de pokémon */
Dom.prototype.deletaCardsPokemon = function () {
  const cards = this.element.querySelectorAll(".pokemon");
  cards.forEach((card) => {
    card.parentElement.removeChild(card);
  });
};

/* Gera o modal do pokémon */
Dom.prototype.criaModal = function (pokemon) {
  const section = document.createElement("section");
  section.classList.add("modal-container");
  section.dataset.modal = "container";

  /* Dados mais importantes extraidos do JSON pokemon */
  // nome, id, imagem, tipos, weakness, background,
  // height, weight, ability, stats
  /* ------------------------------------------------ */
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
  /* ------------------------------------------------ */

  /* Estrutura HTML do elemento modal */
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

  //Se o click ocorrer dentro do modal, o target será no máximo o próprio modal. Se o click ocorrer no botão de fechar, será capturado pelo fechar.contains(target)
  function deletaModal({ target }) {
    if (target === section || fechar.contains(target)) {
      window.removeEventListener("click", deletaModal);
      section.parentNode.removeChild(section);
    }
  }
  window.addEventListener("click", deletaModal);

  /* Atribuição do modal ao elemento pai */
  this.element.appendChild(section);
};

/* Gera [quantidade] cards */
Dom.prototype.criaCardLoading = function (quantidade) {
  const card = document.createElement("div");
  card.classList.add("pokemon-loading");

  /* Estrutura HTML do card de loading */
  card.innerHTML = `
      <div class="pokemon--img-loading loading-effect">
        <span class="img-loading"></span>
      </div>
      <span class="numero-loading loading-effect"></span>
      <span class="loading-footer">
        <span class="nome-loading loading-effect"></span>
        <span class="tipo-loading loading-effect"></span>
      </span>
  `;

  for (let i = 0; i < quantidade; i++) {
    this.element.appendChild(card.cloneNode(true));
  }
};

/* Deleta todos os cards de loading da página */
Dom.prototype.deletaCardsLoading = function () {
  const cards = this.element.querySelectorAll(".pokemon-loading");
  cards.forEach((card) => {
    card.parentElement.removeChild(card);
  });
};

export const dom = new Dom(".pokemons");
