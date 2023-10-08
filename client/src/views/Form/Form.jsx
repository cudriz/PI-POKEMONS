import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTipePokemons, postPokemon } from '../../redux/actions';
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  useEffect(() => {
    dispatch(getTipePokemons());
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    types: []
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    types: ""
  });

  const validate = (state, name) => {
    switch (name) {
      case "name":
        if (state.name === "") {
          setErrors({ ...errors, name: "Campo requerido." });
        } else if (state.name.length > 30) {
          setErrors({ ...errors, name: "Nombre demasiado largo." });
        } else {
          setErrors({ ...errors, name: "" });
        }
        break;

      // Agrega validaciones para otros campos aquí

      default:
        break;
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (event.target.name === "types") {
      setState({
        ...state,
        types: [...state.types, event.target.value]
      });
    } else {
      setState({
        ...state,
        [property]: value
      });
    }

    validate(
      {
        ...state,
        [property]: value
      },
      property
    );
  };

  const disableButton = () => {
    for (let error in errors) {
      if (errors[error] !== "") {
        return true; // Habilita el botón si hay algún error
      }
    }
    return false; // Deshabilita el botón si no hay errores
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postPokemon(state));
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Crea tu Pokémon</h1>
        <label>Nombre: </label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={state.name}
        />
        <div>
          <p>{errors.name}</p>
        </div>

        <label>Imagen: </label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          value={state.image}
        />

        <label>Vida: </label>
        <input
          onChange={handleChange}
          type="text"
          name="hp"
          value={state.hp}
        />

        <label>Ataque: </label>
        <input
          onChange={handleChange}
          type="text"
          name="attack"
          value={state.attack}
        />

        <label>Defensa: </label>
        <input
          onChange={handleChange}
          type="text"
          name="defense"
          value={state.defense}
        />

        <label>Tipos: </label>
        <select onChange={handleChange} name="types" id="">
          {allTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div>
          {state.types.map((t) => (
            <span key={t}>{t}/</span>
          ))}
        </div>
        <input disabled={disableButton()} type="submit" />
      </form>
    </div>
  );
};

export default Form;
