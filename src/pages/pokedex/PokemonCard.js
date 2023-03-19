import React, { useState, useEffect } from "react";
import styles from "../../styles/PokemonCard.module.css";
import Card from "react-bootstrap/Card";
import { axiosReq } from "../../api/axiosDefaults";

const PokemonCard = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axiosReq
        .get("/api/pokemons/")
        .then((response) => {
          setPokemons(response.data);
          console.log(respone.data);
        })
        .catch((error) => {
          console.log(error);
        });

    }, []);
  return (
    <>
    {pokemons.map((pokemon) => (
        <Card>
            <Card.Img src={pokemon.sprite} alt={pokemon.name}/>
            <Card.Body>
                <Card.Title className="text-center">
                  {pokemon.name}
                </Card.Title>

                <Card.Text>
                  {pokemon.types.join("/")}
                </Card.Text>
                </Card.Body>
        </Card>
    ))}
    </>
  );
}

export default PokemonCard;