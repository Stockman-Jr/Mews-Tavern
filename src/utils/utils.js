const typeColors = {
    normal: "#ACA498",
    water: "#418DC6",
    grass: "#82CE51",
    fire: "#F17F2D",
    flying: "#A1BBEC",
    rock: "#B7B1A2",
    ground: "#A26B2E",
    ghost: "#71599A",
    psychic: "#E36887",
    dark: "#503E2C",
    fairy: "#FFC4DF",
    dragon: "#634BB4",
    poison: "#A233AA",
    steel: "#87b1bb",
    ice: "#98D6D5",
    fighting: "#BC4E41",
    bug: "#B7CE46",
    electric: "#F7EE33",
  };
  
  export function getGradientForTypes(types) {
    if (types.length === 1) {
      return typeColors[types[0]];
    } else {
      const [type1, type2] = types;
      const gradient = `linear-gradient(to bottom right, ${typeColors[type1]}, ${typeColors[type2]})`;
      return gradient;
    }
  }
  
  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }