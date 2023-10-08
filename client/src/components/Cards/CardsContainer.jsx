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
          attack={pokemon.attack}
          defense={pokemon.defense}
          hp={pokemon.hp}
          image={pokemon.image}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
