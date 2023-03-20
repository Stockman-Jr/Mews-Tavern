import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import InfiniteScroll from 'react-infinite-scroll-component';

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
    const [pokemonsPerPage] = useState(66);
    const [totalPages, setTotalPages] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const { data } = await axiosReq.get(`/api/pokemons/?limit=${pokemonsPerPage}`);
          console.log(data.results)
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
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
  }, [pokemonsPerPage]);

  const loadMoreData = async () => {
    const nextPage = currentPage + 1;
    try {
      const { data } = await axiosReq.get(
        `/api/pokemons/?limit=10&offset=${(nextPage - 1) * 9}`
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
      setCurrentPage(nextPage);
      setHasMore(nextPage <= totalPages);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <InfiniteScroll
          className={appStyles.PContainer}
          dataLength={pokemons.length}
          loader={<Asset loader />}
          hasMore={hasMore}
          next={loadMoreData}
        >

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
                  </Card.Body>
                </div>
              </Card>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default PokemonCard;