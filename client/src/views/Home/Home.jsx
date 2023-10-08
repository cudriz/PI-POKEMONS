import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, paginatePokemons } from "../../redux/actions";
import CardsContainer from "../../components/Cards/CardsContainer";

const Home = () => {
  const dispatch = useDispatch();

  const pokemonData = useSelector((state) => state.pokemons); 


  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

const paginate = (event) => {
dispatch(paginatePokemons(event.target.name))
}

 

  return (
    <div>
    <div>
      <button name='prev'onClick={paginate}>Prev</button> <button name='next'onClick={paginate}>Next</button>
    </div>
      <h1>Pokemons</h1>
      <CardsContainer cards={pokemonData} />
      
    </div>
  );
};

export default Home;
