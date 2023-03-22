import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import aniStyles from "../styles/Animations.module.css";

const CatchPokemon = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    pokemon,
    setCaughtPokemons

  } = props;

    const [isCaught, setIsCaught] = useState(false);
    const [caughtPokemonId, setCaughtPokemonId] = useState(id);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleCatch = async () => {
        try {
          const { data } = await axiosReq.post("/api/caught/", {pokemon: pokemon.id});
          console.log("Caught!");
          console.log(data);
          console.log(data.id);
          setCaughtPokemonId(data.id);
          setIsCaught(true);
        } catch (error) {
          console.log(error);
        }
        console.log("Caught!");
      };


      const handleRelease = async () => {
        try {
          await axiosRes.delete(`/api/caught/${caughtPokemonId}/`);
          console.log("Released!");
          setCaughtPokemonId(null);
          setIsCaught(false);
        } catch (error) {
          console.log(error);
        }
  };

  //const isPokemonCaught = caughtPokemon.some((p) => p.pokemon.id === pokemon.id);


  const handleDelete = async () => {
    try {
      await axiosRes.delete("/api/caught/4/");
      console.log("Released!");
    } catch (error) {
      console.log(error);
    }
};

const infoClick = () => {
 console.log(isCaught);
};


  return (
      <>
      {is_owner && caughtPokemonId ?  (
    <div className={aniStyles.PokeBall} onClick={handleRelease}>
      <div className={aniStyles.Caught}></div>
      </div>
            ) : currentUser ? (
              <div className={aniStyles.PokeBall} onClick={handleCatch}>
              <div className={aniStyles.UnCaught}></div>
              </div>
            ) : (
              <div className={aniStyles.PokeBall}>
              <div className={aniStyles.UnCaught}></div>
              </div>  
        )}
       
   
    <div>

         <button onClick={infoClick}>info</button>

    </div>
    </>

  );
}

export default CatchPokemon;