import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";



const Card = ({ id, name, image, vida }) => {

  return (
    <div className={style.card}>
      <img className={style.img} src={image} alt={name} />
      <Link to={`/detail/${id}`}>
        <p className={style.name}>Name: {name}</p>
      </Link>
      <p className={style.vida}>Vida: {vida}</p>
     
    </div>
  );
};

export default Card;
