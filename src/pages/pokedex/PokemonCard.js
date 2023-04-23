import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import ReactPaginate from 'react-paginate';
import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import aniStyles from "../../styles/Animations.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PokemonTypes({ types }) {
    return (
      <>
        {types.map((type) => (
          <div
            key={type}
            className={styles.Circle}
            style={{
              background: getGradientForTypes(types),
            }}
          ></div>
        ))}
      </>
    );
  }

const PokemonCard = ({ page }) => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const currentUser = useCurrentUser();
    const owner = currentUser;
    const history = useHistory();


    const fetchPokemonData = async () => {
      try {
        const { data } = await axiosReq.get(`/api/pokemons/?page=${page}&page_size=${pokemonsPerPage}`);
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / pokemonsPerPage));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCaughtPokemons = async () => {
      try{
        const { data } = await axiosReq.get(`/api/caught/?owner=${owner.pk}`);
        setCaughtPokemons(data.results);       
      }catch(err) {
        console.log(err);
      }
    };

    useEffect(() => {
      setCurrentPage(page);
      setIsLoaded(false);
      fetchPokemonData();
      fetchCaughtPokemons();
    }, [page, pokemonsPerPage, owner]);


    const handleCatch = async ({pokemon}) => {
      try {
        const { data } = await axiosReq.post(`/api/caught/`, {
          pokemon: pokemon.id,
        });
        setCaughtPokemons((prevCaughtPokemons) => [
          ...prevCaughtPokemons,
          { id: data.id, pokemon: pokemon.id },
        ]);
      } catch (error) {
        console.log(error);
      }
    };


    const CatchButton = ({ pokemon }) => {
      const isPokemonCaught = caughtPokemons.some(
        (caughtPokemon) => caughtPokemon.pokemon.id === pokemon.id
      );
  
      if (isPokemonCaught) {
        return (
          <div className={aniStyles.PokeBall} >
            <div className={aniStyles.Caught}></div>
          </div>
        );
      } else {
        return (
          <div className={aniStyles.PokeBall} onClick={handleCatch}>
            <div className={aniStyles.UnCaught}></div>
          </div>
        );
      }
    };

 


  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
  setCurrentPage(newPage);
  history.push(`/pokedex/${newPage}`);
  };

  return (
    <>
      <div className={`${appStyles.PContainer} mt-3`}>
        {isLoaded ? (
          <>
            {pokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles.PokemonContainer}>
                <Card className={styles.PokemonCard}>
                  <div className={styles.CardFront}>
                    <Card.Img
                      className={styles.PokemonCardImage}
                      src={pokemon.sprite}
                      alt={pokemon.name} />
                    <PokemonTypes types={pokemon.types} />
                    <Card.Body>
                      <Card.Title className="text-center">
                        {capitalizeFirstLetter(pokemon.name)}
                      </Card.Title>

                      <Card.Text className={styles.TextTypes}>
                        {pokemon.types.join("/")}
                      </Card.Text>

                      <CatchButton pokemon={pokemon.id} />
                    </Card.Body>

                  </div>

                </Card>
              </div>
            ))}

            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              activeClassName={'active'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              forcePage={page - 1}
            />
          </>
        ) : (
          <Asset loader />
        )}

      </div>
    </>
  );
}

export default PokemonCard;