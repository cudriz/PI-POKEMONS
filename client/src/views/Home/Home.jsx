import CardsContainer from "../../components/Cards/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,  useState } from "react";
import { getPokemons, } from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const cardsPerPage = 27; // Número de tarjetas por página
  const [currentPage, setCurrentPage] = useState(1);

    // Calcular el índice de inicio y fin de las tarjetas en la página actual
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = pokemons.slice(indexOfFirstCard, indexOfLastCard);

     // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1>Pokemons</h1>
      
        <CardsContainer cards={currentCards} />
        <Pagination
         cardsPerPage={cardsPerPage}
         totalCards={pokemons.length}
         currentPage={currentPage}
         paginate={paginate}
        
        />
    
    </>
  );
};

export default Home;
