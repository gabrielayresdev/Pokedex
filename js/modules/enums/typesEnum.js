/* Objeto com os paths para os icones e background, hexadecimal das cores de texto, rgb das cores de fundo e array com as fraquezas de cada tipo  */
export const types = {
  All: {
    icon: "types/icon-all.svg",
    color: "#000000",
  },
  bug: {
    icon: "types/bug.svg",
    modalBg: "modalBg/bug_bg.svg",
    color: "#9BBA48",
    bgColor: "rgba(155, 186, 72, 0.1)",
    weakness: ["fire", "flying", "rock"],
  },
  dark: {
    icon: "types/dark.svg",
    modalBg: "modalBg/dark_bg.svg",
    color: "#595761",
    bgColor: "rgba(89, 87, 97, 0.1)",
    weakness: ["bug", "fairy", "fighting"],
  },
  dragon: {
    icon: "types/dragon.svg",
    modalBg: "modalBg/dragon_bg.svg",
    color: "#2C6AC1",
    bgColor: "rgba(44, 106, 193, 0.1)",
    weakness: ["dragon", "fairy", "ice"],
  },
  electric: {
    icon: "types/electric.svg",
    modalBg: "modalBg/electric_bg.svg",
    color: "#D4BC34",
    bgColor: "rgba(212, 188, 52, 0.1)",
    weakness: ["ground"],
  },
  fairy: {
    icon: "types/fairy.svg",
    modalBg: "modalBg/fairy_bg.svg",
    color: "#E296E1",
    bgColor: "rgba(226, 150, 225, 0.1)",
    weakness: ["poison", "steel"],
  },
  fighting: {
    icon: "types/fighting.svg",
    modalBg: "modalBg/fighting_bg.svg",
    color: "#C44D61",
    bgColor: "rgba(196, 77, 97, 0.1)",
    weakness: ["fairy", "flying", "psychic"],
  },
  ground: {
    icon: "types/ground.svg",
    modalBg: "modalBg/ground_bg.svg",
    color: "#CE8056",
    bgColor: "rgba(206, 128, 86, 0.1)",
    weakness: ["grass", "ice", "water"],
  },
  ice: {
    icon: "types/ice.svg",
    modalBg: "modalBg/ice_bg.svg",
    color: "#71BAAC",
    bgColor: "rgba(113, 186, 172, 0.1)",
    weakness: ["fighting", "fire", "rock", "steel"],
  },
  normal: {
    icon: "types/normal.svg",
    modalBg: "modalBg/normal_bg.svg",
    color: "#909090",
    bgColor: "rgba(144, 144, 144, 0.1)",
    weakness: ["fighting"],
  },
  poison: {
    icon: "types/poison.svg",
    modalBg: "modalBg/poison_bg.svg",
    color: "#AC6ACA",
    bgColor: "rgba(172, 106, 202, 0.1)",
    weakness: ["ground", "psychic"],
  },
  psychic: {
    icon: "types/psychic.svg",
    modalBg: "modalBg/psychic_bg.svg",
    color: "#EB8B85",
    bgColor: "rgba(235, 139, 133, 0.1)",
    weakness: ["bug", "dark", "ghost"],
  },
  rock: {
    icon: "types/rock.svg",
    modalBg: "modalBg/rock_bg.svg",
    color: "#84BEB3",
    bgColor: "rgba(132, 190, 179, 0.1)",
    weakness: ["fighting", "grass", "ground", "steel", "water"],
  },
  ghost: {
    icon: "types/ghost.svg",
    modalBg: "modalBg/ghost_bg.svg",
    color: "#616EB7",
    bgColor: "rgba(97, 110, 183, 0.1)",
    weakness: ["dark", "ghost"],
  },
  grass: {
    icon: "types/grass.svg",
    modalBg: "modalBg/grass_bg.svg",
    color: "#73B861",
    bgColor: "rgba(115, 184, 97, 0.1)",
    weakness: ["bug", "fire", "flying", "ice", "poison"],
  },
  steel: {
    icon: "types/steel.svg",
    modalBg: "modalBg/steel_bg.svg",
    color: "#6594A1",
    bgColor: "rgba(101, 148, 161, 0.1)",
    weakness: ["fighting", "fire", "ground"],
  },
  water: {
    icon: "types/water.svg",
    modalBg: "modalBg/water_bg.svg",
    color: "#4F77BE",
    bgColor: "rgba(79, 119, 190, 0.1)",
    weakness: ["electric", "grass"],
  },
  fire: {
    icon: "types/fire.svg",
    modalBg: "modalBg/fire_bg.svg",
    color: "#E96303",
    bgColor: "rgba(233, 99, 3, 0.1)",
    weakness: ["ground", "rock", "water"],
  },
  flying: {
    icon: "types/flying.svg",
    modalBg: "modalBg/flying_bg.svg",
    color: "#758CBD",
    bgColor: "rgba(117, 139, 189, 0.1)",
    weakness: ["electric", "ice", "rock"],
  },
};
