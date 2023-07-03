const APIUrl = "https://pokeapi.co/api/v2/pokemon/1";

const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

async function fetchDataPokemon(id) {
  try {
    const res = await fetch(APIUrl + id);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function createPokemonCard(pokemonData) {
  const { id, name, types, sprites } = pokemonData;

  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokemonElement.style.backgroundColor = colors[types[0].type.name];

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const img = document.createElement("img");
  img.src = sprites.front_default;
  img.alt = name;
  imgContainer.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("info");

  const number = document.createElement("span");
  number.classList.add("number");
  number.textContent = "#" + id.toString().padStart(3, "0");

  const pokemonName = document.createElement("h3");
  pokemonName.classList.add("name");
  pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  const type = document.createElement("small");
  type.classList.add("type");
  type.innerHTML = "Type: <span>" + types[0].type.name + "</span>";

  info.appendChild(number);
  info.appendChild(pokemonName);
  info.appendChild(type);

  pokemonElement.appendChild(imgContainer);
  pokemonElement.appendChild(info);

  poke_container.appendChild(pokemonElement);
}

async function loadPokemonCards() {
    for (let i = 0; i <= pokemon_count; i++) {
      try {
        const pokemonData = await fetchDataPokemon(i);
        createPokemonCard(pokemonData);
      } catch (error) {
        console.log(error);
      }
    }
  }

loadPokemonCards();
