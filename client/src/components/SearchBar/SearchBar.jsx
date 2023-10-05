import style from "./SearchBar.module.css";
import { NavLink } from "react-router-dom";





export const SearchBar = ()=> {
  
    return (
        <div className={style.search}>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Buscar Pokemon"
            // value={search.name}
            // onChange={searchHandler}
          />
          <NavLink to="/">
            <button
            //   onClick={submitHandler}
              value="Search"
              type="submit"
              className={style.button}
            >
              Search
            </button>
          </NavLink>
        </div>
      );
}

