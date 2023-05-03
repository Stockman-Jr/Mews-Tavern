import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import styles from "../../styles/PokemonCard.module.css";
import aniStyles from "../../styles/Animations.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import modalStyles from "../../styles/Modals.module.css";

import { getGradientForTypes, capitalizeFirstLetter } from "../../utils/utils";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCatch = async () => {
    try {
      const { data } = await axiosReq.post("/api/caught/", {
        pokemon: pokemon.id,
      });
      setCaughtPokemons((prevCaughtPokemons) => ({
        ...prevCaughtPokemons,
        results: [
          ...prevCaughtPokemons.results,
          { id: data.id, pokemon: { id: pokemon.id }  },
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

  const modalWarning = (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className={modalStyles.ModalHeader} closeButton>
          <Modal.Title>Confirm Release</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.ModalBody}>
          <p>
            Are you sure you want to release{" "}
            {capitalizeFirstLetter(pokemon.name)}
            ? <br /> If you have any Pokémon builds created with it, they will
            be deleted too. You can create a new build with this pokémon if you
            catch it again.
          </p>
        </Modal.Body>
        <Modal.Footer className={modalStyles.ModalFooter}>
          <Button
            className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
            onClick={handleRelease}
          >
            Release
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


  const pokeBall = (
    <>
      <div className={aniStyles.PokeBall}>
        {id ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Release?</Tooltip>}
          >
            <div className={aniStyles.Caught} onClick={handleShowModal}></div>
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
            overlay={<Tooltip>Log in to save caught pokémon!</Tooltip>}
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
              {modalWarning}
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PokemonCard;