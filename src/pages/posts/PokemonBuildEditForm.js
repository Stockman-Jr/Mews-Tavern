import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/BuildCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

import { useHistory, Link, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { MoveFields, EvStatOptions, FormFields } from "../../components/FormSelectFields";
import { fetchGameFilterChoices } from "../../utils/utils";


function PokemonBuildEditForm() {
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [selectedPokemonSprite, setSelectedPokemonSprite] = useState("");
    const [gameFilterChoices, setGameFilterChoices] = useState([]);
    const [pokeBuildData, setPokeBuildData] = useState({
      pokemon: "",
      move_one: "",
      move_two: "",
      move_three: "",
      move_four: "",
      ability: "",
      ev_stats: [],
      nature: "",
      held_item: "",
      game_filter: "",
      content: "",
      post_type: "Pokémon Build",
    });
    const {
      pokemon,
      move_one,
      move_two,
      move_three,
      move_four,
      ability,
      ev_stats,
      nature,
      held_item,
      content,
      game_filter,
      post_type,
    } = pokeBuildData;
    const history = useHistory();
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    useEffect(() => {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/posts/pokebuild/${id}`);
          const {
            pokemon,
            move_one,
            move_two,
            move_three,
            move_four,
            ability,
            ev_stats,
            nature,
            held_item,
            content,
            game_filter,
            post_type,
            caught_id,
            is_owner,
          } = data;
  
          console.log(data);
          console.log(data.pokemon);
  
          const { data: pokeData } = await axiosReq.get(
            `/api/caught/?owner=${data.profile_id}`
          );
  
          console.log(pokeData.results);
          const caughtPokemon = pokeData.results.find(
            (p) => p.pokemon.id === data.pokemon_id
          );
          setCaughtPokemons(pokeData.results);
  
          is_owner
            ? setPokeBuildData({
                pokemon: data.caught_id,
                move_one,
                move_two,
                move_three,
                move_four,
                ability,
                ev_stats,
                nature,
                held_item,
                content,
                game_filter,
                post_type,
              })
            : history.push("/");
  
          setSelectedPokemon(caughtPokemon.pokemon);
        } catch (err) {
          console.log(err);
        }
      };
      const choices = JSON.parse(localStorage.getItem("gameFilterChoices"));
      if (choices) {
        setGameFilterChoices(choices);
      } else {
        fetchGameFilterChoices().then(setGameFilterChoices);
      }
  
      handleMount();
    }, [history, id]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setPokeBuildData(prevState => {
      if (type === 'checkbox' && prevState[name].length >= 2) {
        return prevState;
      } else if (type === 'checkbox') {
        const updatedEvStats = [...prevState[name], value];
        return { ...prevState, [name]: updatedEvStats };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    pokeBuildData.pokemon = selectedPokemon.name;
    console.log("Pokemon Build:", pokeBuildData);

    const formData = new FormData();

    formData.append("pokemon", pokemon);
    formData.append("move_one", move_one);
    formData.append("move_two", move_two);
    formData.append("move_three", move_three);
    formData.append("move_four", move_four);
    formData.append("ability", ability);
    for (let i = 0; i < ev_stats.length; i++) {
      formData.append("ev_stats", ev_stats[i]);
    }
    formData.append("nature", nature);
    formData.append("held_item", held_item);
    formData.append("content", content);
    formData.append("post_type", post_type);

    try {
      const { data } = await axiosReq.put(`/posts/pokebuild/${id}/`, formData);
      history.push({
        pathname: `/posts/${data.id}`,
        state: { post_type: post_type },
      });
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  return (
    <>
    <div className={`${styles.BuildForm} mt-5 py-4`}>
      <Form onSubmit={handleSubmit}>
        <Row className={appStyles.Row}>
          <Col>
            <Container>
            <Form.Group controlId="pokemon-select">
                  <Form.Label>Edit Pokémon build for:</Form.Label>
                  <Form.Control
                    as="select"
                    name="pokemon"
                    value={pokemon}
                    disabled
                  >
                    <option value={pokeBuildData.caught_id}>
                      {selectedPokemon.name}
                    </option>
                  </Form.Control>
                </Form.Group>
                {errors.pokemon?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group className={styles.SelectWrapper}>
                  <div className={styles.SpriteBox}>
                  <Image
                      src={selectedPokemon.sprite}
                      alt={`${selectedPokemon.name} sprite`}
                    />
                  </div>
                  <div className={styles.SelectBox}>
                    {selectedPokemon && (
                      <>
                        <MoveFields
                          selectedPokemon={selectedPokemon}
                          setSelectedPokemon={setSelectedPokemon}
                          handleChange={handleChange}
                          pokeBuildData={pokeBuildData}

                        />

                          <EvStatOptions
                            handleChange={handleChange}
                            pokeBuildData={pokeBuildData}
                          />

                      </>
                    )}
                  </div>
                </Form.Group>
                <FormFields
                  handleChange={handleChange}
                  pokeBuildData={pokeBuildData}
                />
                <Form.Group className="mt-2">
                  <Form.Label htmlFor="game_filter">
                    Select a game:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="game_filter"
                    value={game_filter}
                    onChange={handleChange}
                  >
                    <option value="">--Choose game--</option>
                    {gameFilterChoices.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.display_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {errors.game_filter?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.content?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
                <div className={appStyles.BtnWrapper}>
                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                    type="submit"
                  >
                    Share
                  </Button>

                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
            </Container>
          </Col>
        </Row>
      </Form>
    </div>
   
    </>
  );
}

export default PokemonBuildEditForm;