import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ url }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    // Hacer una solicitud a la URL del Pokémon para obtener los detalles
    axios
      .get(url)
      .then((response) => {
        setPokemonDetails(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener detalles del Pokémon:", error);
      });
  }, [url]);

  return (
    <div className={style.card}>
      {pokemonDetails ? (
        <>
          <img className={style.img} src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <Link to={`/detail/${pokemonDetails.id}`}>
          <p className={style.name}>Name: {pokemonDetails.name}</p>
          </Link>

          <p className={style.types}>Types: {pokemonDetails.types.map((type) => type.type.name).join(", ")}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Card;
