import React, { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import aniStyles from "../styles/Animations.module.css";

const CatchPokemon = ({ pokemon }) => {
    const [isCaught, setIsCaught] = useState(false);
    const currentUser = useCurrentUser();
    const owner = currentUser?.username;

    const handleCatch = async () => {
        const data = {
          owner: currentUser.id, 
          pokemon: pokemon.id,
        };
        try {
          const response = await axiosReq.post("/api/caught/", data);
          console.log("Caught!");
          console.log(response.data); 
          setIsCaught(true);
        } catch (error) {
          console.log(error);
        }
      };


      const handleRelease = async () => {
        try {
          const response = await axiosReq.delete(`/api/caught/${pokemon.id}/`);
          console.log(response.data); 
          console.log("Released!");
          setIsCaught(false);
        } catch (error) {
          console.log(error);
        }
  };

  return (
    <div className={aniStyles.PokeBall} onClick={isCaught ? handleRelease : handleCatch}>
        {isCaught ?  (
        
            <div className={aniStyles.Caught}></div>
            ) : (
            <div className={aniStyles.UnCaught}></div>      
        )}
    </div>
  );
}

export default CatchPokemon;