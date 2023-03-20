import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

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
    const [pokemonsPerPage, setPokemonsPerPage] = useState(66);
    const [totalPages, setTotalPages] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const offset = (currentPage - 1) * pokemonsPerPage;
          const { data } = await axiosReq.get(`/api/pokemons/?limit=${pokemonsPerPage}&offset=${offset}`);

          setPokemons(data.results);
          setTotalPages(Math.ceil(data.count / pokemonsPerPage));
          setHasLoaded(true);
        } catch (error) {
          console.log(error);
        }
      };
  setHasLoaded(false);
  const timer = setTimeout(() => {
    fetchPokemonData();
  }, 2000);

  return () => {
    clearTimeout(timer);
  };
  }, [currentPage, pokemonsPerPage]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
    {hasLoaded ? (
      <> 
    {pokemons.map((pokemon) => (
        <div key={pokemon.id} className={styles.PokemonContainer}>
        <Card className={styles.PokemonCard}>
        <div className={styles.CardFront}>
            <Card.Img 
            className={styles.PokemonCardImage}
            src={pokemon.sprite} 
            alt={pokemon.name}/>
            <PokemonTypes types={pokemon.types} />
            <Card.Body>
                <Card.Title className="text-center">
                {capitalizeFirstLetter(pokemon.name)}
                </Card.Title>

                <Card.Text className={styles.TextTypes}>
                  {pokemon.types.join("/")}
                </Card.Text>
                </Card.Body>
                </div>
        </Card>
        </div>
    ))}

      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      </>
      ) : (
          <Asset loader />
        )}
    </>
  );
}

export default PokemonCard;