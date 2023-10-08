import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemons.find((p) => p.id === parseInt(id)));

  useEffect(() => {
   
    dispatch(getPokemons());
  }, [dispatch]);



  return (
    <div>
      {pokemon && (
        <>
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
          {pokemon.name && <h2>Name: {pokemon.name}</h2>}
          {pokemon.id && <h2>Id: {pokemon.id}</h2>}
          {pokemon.vida && <p>Vida: {pokemon.vida}</p>}
          {pokemon.ataque && <p>Ataque: {pokemon.ataque}</p>}
          {pokemon.defensa && <p>Defensa: {pokemon.defensa}</p>}
        </>
      )}
    </div>
  );
};

export default Detail;
