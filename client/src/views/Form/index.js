import { useState } from "react";
import style from "./Form.module.css";

const Form = () => {
  const [state, setState] = useState({
    Nombre: "",
    Imagen: "",
    Vida: 0,
    Ataque: 0,
    Defensa: 0,
    Tipos: []
  });

  const [errors, setErrors] = useState({
    Nombre: "",
    Imagen: "",
    Vida: "",
    Ataque: "",
    Defensa: "",
    Tipos: ""
  });

  const validate = (formData) => {
    const newErrors = {
      Nombre: "",
      Imagen: "",
      Vida: "",
      Ataque: "",
      Defensa: "",
      Tipos: ""
    };

    // Validación para el campo Nombre (solo letras y espacios permitidos)
    if (!/^[A-Za-z\s]+$/.test(formData.Nombre)) {
      newErrors.Nombre = "Nombre no válido";
    }

    // Validación para el campo Imagen (debe ser una URL válida)
    if (!isValidURL(formData.Imagen)) {
      newErrors.Imagen = "URL de la imagen no válida";
    }

    // Validación para los campos numéricos (deben ser números mayores que 0)
    if (formData.Vida <= 0) {
      newErrors.Vida = "Vida debe ser un número mayor que 0";
    }

    if (formData.Ataque <= 0) {
      newErrors.Ataque = "Ataque debe ser un número mayor que 0";
    }

    if (formData.Defensa <= 0) {
      newErrors.Defensa = "Defensa debe ser un número mayor que 0";
    }

    // Validación para el campo Tipos (debe seleccionarse al menos un tipo)
    if (formData.Tipos.length === 0) {
      newErrors.Tipos = "Debes seleccionar al menos un tipo";
    }

    setErrors(newErrors);

    // Verificar si hay errores
    for (const key in newErrors) {
      if (newErrors[key] !== "") {
        return false;
      }
    }

    return true;
  };

  // Función para validar si una cadena es una URL válida
  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (event.target.name === "Tipos") {
      setState({
        ...state,
        Tipos: [...state.Tipos, event.target.value]
      });
    } else {
      setState({
        ...state,
        [property]: value
      });
    }
  };

  const Types = ["agua", "fuego", "aire"];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate(state)) {
      console.log("Formulario válido, puedes enviar los datos:", state);
    } else {
      console.log("El formulario tiene errores, corrígelos antes de enviar.");
    }
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Crea tu Pokémon</h1>
        <label>Nombre: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Nombre"
          value={state.Nombre}
        />
        {errors.Nombre && <p className={style.error}>{errors.Nombre}</p>}

        <label>Imagen: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Imagen"
          value={state.Imagen}
        />
        {errors.Imagen && <p className={style.error}>{errors.Imagen}</p>}

        <label>Vida: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Vida"
          value={state.Vida}
        />
        {errors.Vida && <p className={style.error}>{errors.Vida}</p>}

        <label>Ataque: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Ataque"
          value={state.Ataque}
        />
        {errors.Ataque && <p className={style.error}>{errors.Ataque}</p>}

        <label>Defensa: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Defensa"
          value={state.Defensa}
        />
        {errors.Defensa && <p className={style.error}>{errors.Defensa}</p>}

        <label>Tipos: </label>
        <select onChange={handleChange} name="Tipos" id="" multiple>
          {Types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.Tipos && <p className={style.error}>{errors.Tipos}</p>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
