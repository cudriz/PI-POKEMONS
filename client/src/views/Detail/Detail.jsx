import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(({ data }) => {
        if (data.name) {
          const cleanedData = {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            vida: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
            ataque: data.stats.find((stat) => stat.stat.name === "attack")
              .base_stat,
            defensa: data.stats.find((stat) => stat.stat.name === "defense")
              .base_stat,
          };
          setPokemon(cleanedData);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del Pokémon:", error);
      });

    return () => setPokemon({});
  }, [id]);

  return (
    <div>
      {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
      {pokemon.name && <h2>Name: {pokemon.name}</h2>}
      {pokemon.id && <h2>Id: {pokemon.id}</h2>}
      {pokemon.vida && <p>Vida: {pokemon.vida}</p>}
      {pokemon.ataque && <p>Ataque: {pokemon.ataque}</p>}
      {pokemon.defensa && <p>Defensa: {pokemon.defensa}</p>}
    </div>
  );
};

export default Detail;
