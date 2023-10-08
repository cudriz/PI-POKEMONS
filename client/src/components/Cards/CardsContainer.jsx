import React from "react";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";

const CardsContainer = ({ cards }) => {
  return (
    <div className={style.container}>
      {cards.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          ataque={pokemon.ataque}
          defensa={pokemon.defensa}
          vida={pokemon.vida}
          image={pokemon.image}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
