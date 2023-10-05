import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from './Navbar.module.css'
const Navbar = () => {
  return (
    <div className={style.mainContainer}>
      <SearchBar/>
       <button className={style.button}>
                <Link to='/home'>HOME</Link>
            </button>
      
            <button className={style.button}>
                <Link to='/create'>CREATE</Link>
            </button>
     
    </div>
  );
};

export default Navbar;
