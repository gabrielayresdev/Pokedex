// Ativa e desativa os botões de type e de carregar mais pokémons
export default function toggleBtnsDisabled() {
  const typesBtn = document.querySelectorAll(".tipo");
  const loadBtn = document.querySelector(".loadBtn");

  loadBtn.classList.toggle("disabled");
  typesBtn.forEach((btn) => {
    btn.classList.toggle("disabled");
  });
}
