const {Router} = require("express")
const {getPokemonHandler, getIdHandler, createHandler} = require ('../handlers/pokemonsHandler')

const pokemonRouter = Router();


pokemonRouter.get("/", getPokemonHandler)

pokemonRouter.get("/:id", getIdHandler)

pokemonRouter.post("/", createHandler)

module.exports = pokemonRouter