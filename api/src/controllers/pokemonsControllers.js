const axios = require ('axios')
const URL_API = "https://pokeapi.co/api/v2/pokemon/"
const {pokemon, Type} = require ('../db')

const infoCleaner = (array) => {
    return array.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.sprites.front_default,
        vida: element.stats.find((stat) => stat.stat.name === "hp").base_stat,
        ataque: element.stats.find((stat) => stat.stat.name === "attack").base_stat,
        defensa: element.stats.find((stat) => stat.stat.name === "defense").base_stat,
        created: false,
      };
    });
  };


const  getAllPokemons = async () =>{
    
    const pokemonsDb= await pokemon.findAll()

    const pokemonsApi = await axios.get(`${URL_API}?limit=50`);
    const pokemonsApiResults = pokemonsApi.data.results;
    // Mapeamos los resultados y hacemos una solicitud para obtener los detalles de cada Pokémon
    const pokemonDetailsPromises = pokemonsApiResults.map(async (pokemon) => {
      const pokemonResponse = await axios.get(pokemon.url);
      return pokemonResponse.data;
    });

     // Esperamos a que se resuelvan todas las solicitudes
     const pokemonDetails = await Promise.all(pokemonDetailsPromises);

     const formattedPokemons = infoCleaner(pokemonDetails)

    

    return [...pokemonsDb, ...formattedPokemons]

}

const getIdPokemon =async (id,source) =>{
    let pokemonData;
    pokemonData = 
    source === "api"
      ? (await axios.get(`${URL_API}/${id}`)).data
      : await pokemon.findByPk(id,);
const formattedPokemon = infoCleaner([pokemonData])[0]
  return formattedPokemon;
}

const getPokemonByName = async  (name)=>{
  
  const nameTolowerCase = name.toLowerCase();
  // Buscar en la base de datos
  const pokemonDb = await pokemon.findOne({ where: { Nombre: nameTolowerCase } });

  if (pokemonDb) {
    return pokemonDb; 
  } else {
    const pokemonApi = `${URL_API}${nameTolowerCase}`;
    const { data } = await axios.get(pokemonApi);   
    if (data) {
      const pokemon = infoCleaner([data]);
      return pokemon; 
    } 
  }
};

const createPokemonDb = async  (
    Nombre,
    Imagen,
    Vida,
    Ataque,
    Defensa)=>{
const pokemonn = await pokemon.create({
    Nombre,
    Imagen,
    Vida,
    Ataque,
    Defensa})
    return pokemonn
}

module.exports = {
    getAllPokemons,
    getIdPokemon,
    getPokemonByName,
    createPokemonDb
}