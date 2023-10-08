import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, paginatePokemons, filterPokemonsAction, getTipePokemons, orderPokemonsAction } from "../../redux/actions";
import CardsContainer from "../../components/Cards/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();

  const pokemonData = useSelector((state) => state.pokemons); 
  const allTypes = useSelector((state)=> state.allTypes)
console.log(allTypes);


  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTipePokemons());
  }, [dispatch]);

const paginate = (event) => {
dispatch(paginatePokemons(event.target.name))
}

//  const filterPokemons = (event) =>{
// dispatch(filterPokemonsAction(event.target.value))
//  }
const filterPokemons = (event) => {
  const selectedType = event.target.options[event.target.selectedIndex].value;
  dispatch(filterPokemonsAction(selectedType));
};
const orderPokemons = (event) => {
  
  dispatch(orderPokemonsAction(event.target.value));
};

  return (
    <div>
      <div>
        <h4>filtros/ordenamientos:</h4>
        <span>ordenamientos por nombre: </span>
         <select onChange={orderPokemons}name="orden" id="">
          
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>

        </select>
        <select onChange={filterPokemons}name="Tipos" id="" >
        {allTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    <div>
      <h4>paginado</h4>
      <button name='prev'onClick={paginate}>Prev</button> <button name='next'onClick={paginate}>Next</button>
    </div>
      <h1>Pokemons</h1>
      <CardsContainer cards={pokemonData} />
      
    </div>
  );
};

export default Home;
