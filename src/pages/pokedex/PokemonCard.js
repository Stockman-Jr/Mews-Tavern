import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import Card from "react-bootstrap/Card";
import { axiosReq } from "../../api/axiosDefaults";

const PokemonCard = () => {
    const [pokemons, setPokemons] = useState({ results: [] });

    useEffect(() => {
        axiosReq
          .get("/api/pokemons/")
          .then((response) => {
            setPokemons(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  return (
    <>
    {pokemons.results.map((pokemon) => (
        <div className={styles.PokemonContainer}>
        <Card className={styles.PokemonCard}>
        <div className={styles.CardFront}>
            <Card.Img 
            className={styles.PokemonCardImage}
            src={pokemon.sprite} 
            alt={pokemon.name}/>
            <Card.Body>
                <Card.Title className="text-center">
                  {pokemon.name}
                </Card.Title>

                <Card.Text className={styles.TextTypes}>
                  {pokemon.types.join("/")}
                </Card.Text>
                </Card.Body>
                </div>
        </Card>
        </div>
    ))}
    </>
  );
}

export default PokemonCard;