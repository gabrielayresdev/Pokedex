export default function initDropdownMenu() {
  const tiposDD = document.querySelector("[data-dropdown=header]");

  const handleClick = () => {
    const tiposBtns = document.querySelector("[data-dropdown=options]");
    tiposBtns.classList.toggle("active");

    const fechaNav = ({ target }) => {
      const nav = document.querySelector(".tipo-container");
      console.log(nav.contains(target));
      if (!nav.contains(target)) {
        tiposBtns.classList.remove("active");
        window.removeEventListener("click", fechaNav);
      }
    };

    window.addEventListener("click", fechaNav);
  };

  tiposDD.addEventListener("click", handleClick);
}
