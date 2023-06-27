export default function toggleBtnsDisabled() {
  const typesBtn = document.querySelectorAll(".tipo");
  const loadBtn = document.querySelector(".loadBtn");

  loadBtn.classList.toggle("disabled");
  typesBtn.forEach((btn) => {
    btn.classList.toggle("disabled");
  });
}
