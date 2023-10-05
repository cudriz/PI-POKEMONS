import axios from 'axios'
// const URL = "https://pokeapi.co/api/v2/pokemon"

export const GET_POKEMONS = "GET_POKEMONS"



export const getPokemons = () => {
    return function (dispatch) {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=270")
          .then(response => {
            // Extrae la lista de pokemons de la respuesta
            const pokemons = response.data.results;
            dispatch({ type: GET_POKEMONS, payload: pokemons });
          })
}}

