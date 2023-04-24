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

const PokemonCard = (props) => {
  const { id, pokemon, setCaughtPokemons } = props;


    const handleCatch = async () => {
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




 



  return (
    <>
              <div className={styles.PokemonContainer}>
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

    </>
  );
}

export default PokemonCard;