document.querySelector("#button").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(pokemon) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonInfo").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h2>${capitalizeFirstLetter(data.name)}</h2>
      </div>`;
    })
    .catch((error) => {
      document.querySelector(".pokemonInfo").innerHTML = `
      <h3>❌ Pokémon no encontrado ❌</h3>
      `;
      console.log("Pokemon no encontrado", error);
    });
}

// Función para cargar y mostrar el listado de Pokémon
async function loadPokemonList() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();

    const pokemonListContainer = document.getElementById('pokemon-list');

    data.results.forEach(pokemon => {
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');

      const pokemonName = document.createElement('h2');
      pokemonName.textContent = pokemon.name;

      const pokemonImg = document.createElement('img');
      pokemonImg.classList.add('pokemon-img');
      pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
      pokemonImg.alt = pokemon.name;

      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(pokemonImg);

      // Agregar evento clic para redirigir a la página de detalles del Pokémon
      pokemonCard.addEventListener('click', () => {
        window.location.href = `pokemon-details.html?name=${pokemon.name}`;
      });

      pokemonListContainer.appendChild(pokemonCard);
    });
  } catch (error) {
    console.error('Error al cargar el listado de Pokémon:', error);
  }
}

// Cargar el listado de Pokémon cuando la página se haya cargado completamente
window.addEventListener('load', loadPokemonList);

// Obtener el nombre del Pokémon de la URL
const params = new URLSearchParams(window.location.search);
const pokemonName = params.get('name');

// Hacer una solicitud a la API de Pokémon para obtener los detalles del Pokémon
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => response.json())
  .then(data => {
    // Mostrar los detalles del Pokémon en la página
    // Aquí puedes trabajar con los datos recibidos para mostrar las habilidades del Pokémon
  })
  .catch(error => console.error('Error al obtener los detalles del Pokémon:', error));


