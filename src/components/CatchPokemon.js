import React, { useState } from "react";
import aniStyles from "../styles/Animations.module.css";

const CatchPokemon = () => {
  return (
    <div className={aniStyles.PokeBall}>
        <div className={aniStyles.UnCaught}></div>
    </div>
  )
}

export default CatchPokemon