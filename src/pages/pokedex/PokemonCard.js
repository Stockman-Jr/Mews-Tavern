import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPaginate from 'react-paginate';
import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
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
  const currentUser = useCurrentUser();


  const handleCatch = async () => {
    try {
      const { data } = await axiosReq.post("/api/caught/", {
        pokemon: pokemon.id,
      });
      setCaughtPokemons((prevCaughtPokemons) => ({
        ...prevCaughtPokemons,
        results: [
          ...prevCaughtPokemons.results,
          { id: data.id, pokemon: { id: pokemon.id } },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRelease = async () => {
    try {
      await axiosRes.delete(`/api/caught/${id}/`);
      setCaughtPokemons((prevCaughtPokemons) => ({
        ...prevCaughtPokemons,
        results: prevCaughtPokemons.results.filter(
          (caught) => caught.id !== id
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };


  const pokeBall = (
    <>
      <div className={aniStyles.PokeBall}>
        {id ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Release?</Tooltip>}
          >
            <div className={aniStyles.Caught} onClick={handleRelease}></div>
          </OverlayTrigger>
        ) : currentUser ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Catch!</Tooltip>}
          >
            <div className={aniStyles.UnCaught} onClick={handleCatch}></div>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Log in to save caught pokemons!</Tooltip>}
          >
            <div className={aniStyles.UnCaught}></div>
          </OverlayTrigger>
        )}
      </div>
    </>
  );

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
              {pokeBall}
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PokemonCard;