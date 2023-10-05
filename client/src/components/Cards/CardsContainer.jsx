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
        url={pokemon.url} />
      ))}
    </div>
  );
};

export default CardsContainer;
