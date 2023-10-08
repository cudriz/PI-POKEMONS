import { GET_POKEMONS, GET_TIPE_POKEMONS, POST_POKEMON, PAGINATE, FILTER, ORDER} from "./actions";


const initialState = {
    pokemons: [],
    allTypes: [],
    allPokemonsBackUp: [],
    currentPage: 0,
    pokemonsFilter: [],
    filter: false
  
    
}
const rootReducer = (state= initialState, action)=>{
    const ITEMS_PER_PAGE = 27
    switch(action.type) {
        case GET_POKEMONS:
    return {
        ...state, 
        pokemons: [...action.payload].splice(0, ITEMS_PER_PAGE),
        allPokemonsBackUp: action.payload
    }
    case GET_TIPE_POKEMONS:
        return {
            ...state, 
            allTypes: action.payload
        }
  case POST_POKEMON:
    return { ...state,
         pokemons: [...state.pokemons, action.payload] 
        }
    case PAGINATE:
        const next_page = state.currentPage + 1
        const prev_page = state.currentPage - 1
        const firstIndex = action.payload === "next"? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE


        if(state.filter){
            if(action.payload === "next" && firstIndex >= state.pokemonsFilter.length) return state
            else if(action.payload === "prev" && prev_page < 0) return state

            return {
                ...state,
                pokemons: [...state.pokemonsFilter].splice(firstIndex,ITEMS_PER_PAGE ),
                currentPage: action.payload === "next"? next_page : prev_page
            }
        }

        if(action.payload === "next" && firstIndex >= state.allPokemonsBackUp.length) return state
        else if(action.payload === "prev" && prev_page < 0) return state
        return {
            ...state,
            pokemons: [...state.allPokemonsBackUp].splice(firstIndex,ITEMS_PER_PAGE ),
            currentPage: action.payload === "next"? next_page : prev_page
        }
        case FILTER:
            const filterByTypes =  [...state.allPokemonsBackUp].filter((p)=>p.types.includes(action.payload))
            return {
                ...state,
                pokemons: filterByTypes.splice(0, ITEMS_PER_PAGE),
                pokemonsFilter: filterByTypes,
                filter: true

            }
            case ORDER:
                let orderByName = [];
                if (action.payload === "AZ") {
                  orderByName = [...state.allPokemonsBackUp].sort((prev, next) => {
                    if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
              
                    if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
              
                    return 0;
                  });
                } else {
                  orderByName = [...state.allPokemonsBackUp].sort((prev, next) => {
                    if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
              
                    if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
              
                    return 0;
                  });
                }
              
                return {
                  ...state,
                  pokemons: orderByName.splice(0, ITEMS_PER_PAGE),
                  allPokemonsBackUp: orderByName,
                };
              
    default:
        return{...state}
    }

};


export default rootReducer