import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getTipePokemons, postPokemon} from '../../redux/actions'
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  const allTipes = useSelector((state)=> state.allTypes)

  useEffect(()=>{
dispatch(getTipePokemons())
  }, [dispatch])
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

  const validate = (state, name) => {
switch (name) {
  case "Nombre":
if(state.Nombre === ""){
  setErrors({...errors, Nombre: "campo requerido." })
}else if (state.Nombre.length > 30){
  setErrors({...errors, Nombre: "Nombre demasiado largo." })
}else {
  setErrors({...errors, Nombre: ""})
}
  // case "Imagen":

  // case "Vida":

  // case "Ataque":

  // case "Defensa":

  // case "Tipos":

    
   break

  default: 
    break;
}

  };

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
    validate({
      ...state,
      [property]: value
    }, property)
  };

const disableButton = () =>{
  let disabledAux = true;

  for (let error in errors){
    if(errors[error] === "") disabledAux = false;
    else{
      disabledAux = true;
      break;
    }
  }
  return disabledAux
}


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
          name="Nombre"
          value={state.Nombre}
        />
    <div> <p>{errors.Nombre}</p></div>
    

        <label>Imagen: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Imagen"
          value={state.Imagen}
        />
        

        <label>Vida: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Vida"
          value={state.Vida}
        />

        <label>Ataque: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Ataque"
          value={state.Ataque}
        />
       

        <label>Defensa: </label>
        <input
          onChange={handleChange}
          type="text"
          name="Defensa"
          value={state.Defensa}
        />
       

        <label>Tipos: </label>
        <select onChange={handleChange} name="Tipos" id="" >
          {allTipes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
   
<div>
  {state.Tipos.map((t)=> <span>{t}/</span>)}
</div>
        <input disabled={disableButton()} type="submit" />
      </form>
    </div>
  );
};

export default Form;
