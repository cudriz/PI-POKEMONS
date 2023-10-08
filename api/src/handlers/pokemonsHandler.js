const {
  getAllPokemons,
  getIdPokemon,
  getPokemonByName,
  createPokemonDb,
} = require("../controllers/pokemonsControllers");

const getPokemonHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemonByName = await getPokemonByName(name);
      res.status(200).json(pokemonByName);
    } else {
      const response = await getAllPokemons();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const response = await getIdPokemon(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createHandler = async (req, res) => {
  const { name, image, hp, attack, defense, Type } = req.body;
  try {
    console.log("Datos del Pokémon recibidos:", {
      name,
      image,
      hp,
      attack,
      defense,
      Type,
    });
    const newPokemon = await createPokemonDb(
      name,
      image,
      hp,
      attack,
      defense,
      Type
    );
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getIdHandler,
  createHandler,
};
