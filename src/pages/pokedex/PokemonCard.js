import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import ReactPaginate from 'react-paginate';
import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import CatchPokemon from "../../components/CatchPokemon";

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

const PokemonCard = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const { data } = await axiosReq.get(`/api/pokemons/?page=${currentPage}&page_size=${pokemonsPerPage}`);
        console.log(data.results)
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / pokemonsPerPage));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoaded(false);
    fetchPokemonData();
  }, [currentPage, pokemonsPerPage]);


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
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
                      <CatchPokemon pokemon={pokemon} />
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
              forcePage={currentPage - 1}
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