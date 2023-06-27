import changeTypeDisplay from "./eventFunctions/changeTypeDisplay.js";

export default function initTypeMenu() {
  const typesBtn = document.querySelectorAll(".tipo");

  typesBtn.forEach((btn) => {
    btn.addEventListener("click", changeTypeDisplay);
  });
}
