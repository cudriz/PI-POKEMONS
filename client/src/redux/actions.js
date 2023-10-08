import axios from 'axios'
// const URL = "https://pokeapi.co/api/v2/pokemon"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_TIPE_POKEMONS = "GET_TIPE_POKEMONS"
export const POST_POKEMON = "POST_POKEMON"
export const PAGINATE= "PAGINATE"

export const getPokemons = () => {
    return async function (dispatch) {
      try {
       const response =await axios.get("http://localhost:3001/pokemons/")
       const pokemons= response.data
          console.log(pokemons);
            dispatch({
               type: GET_POKEMONS,
                payload: pokemons 
              });
          
      } catch (error) {
        
      }
        
}}

export const getTipePokemons = () =>{
  return async function (dispatch) {
    try {
     const response =  await axios.get("http://localhost:3001/types/")
console.log(response);
dispatch({
  type: GET_TIPE_POKEMONS,
  payload: response.data
})
    } catch (error) {
      
    }
  }
}

export const postPokemon = (state)=>{
  return async function (dispatch){
    try {
      const response = await axios.post("http://localhost:3001/pokemons/", state)
      console.log(response.data);
      console.log(state);
      dispatch({
        type: POST_POKEMON,
        payload: response.data
      })
    } catch (error) {
      
    }
  }
}

export const paginatePokemons = (order) =>{
  return async function(dispatch){
    try {
      dispatch({
 type: PAGINATE,
 payload: order
      })
    } catch (error) {
      
    }
  }
}

