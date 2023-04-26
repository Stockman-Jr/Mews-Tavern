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

import { useHistory, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoveFields, EvStatOptions, FormFields } from "../../components/FormSelectFields";
import { fetchGameFilterChoices } from "../../utils/utils";


function PokemonBuildCreateForm() {
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
    const currentUser = useCurrentUser();
    const owner = currentUser;
    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(() => {
      const fetchCaughtPokemons = async () => {
        try {
          const { data } = await axiosReq.get(`/api/caught/?owner=${owner.pk}`);
          setCaughtPokemons(data.results);
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
  
      fetchCaughtPokemons();
    }, [owner]);

  const handlePokemonSelect = async (event) => {
    const id = event.target.value;
    const { data } = await axiosReq.get(`/api/caught/${id}`);
    setSelectedPokemon(data.pokemon);
    setSelectedPokemonSprite(data.pokemon.sprite);
  };

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
    console.log(pokeBuildData);
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
    formData.append("game_filter", game_filter);
    formData.append("content", content);
    formData.append("post_type", post_type);

    try {
      const { data } = await axiosReq.post("/posts/pokebuild/", formData);
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
    <div className={`${styles.BuildForm} mt-5 py-4`}>
      <Form onSubmit={handleSubmit}>
        <Row className={appStyles.Row}>
          <Col>
            <Container>
              {caughtPokemons.length === 0 ? (
                <>
                  <Alert variant="warning">
                    You don't have any caught pokemons yet! Please visit the{" "}
                    <Link className={styles.Link} to="/pokedex/1">
                      PokeDex page
                    </Link>{" "}
                    first to catch some pokemon.
                  </Alert>
                  <div className="mt-5">
                    <Link
                      to="/pokedex/1"
                      className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2 p-3`}
                    >
                      PokeDex &#11166;
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Form.Group controlId="pokemon-select">
                    <Form.Label>Select a Pokémon:</Form.Label>
                    <Form.Control
                      as="select"
                      name="pokemon"
                      value={pokemon}
                      onChange={(event) => {
                        handlePokemonSelect(event);
                        handleChange(event);
                      }}
                    >
                      <option value="">--Select a Pokémon--</option>
                      {caughtPokemons.map((p) => (
                        <option key={p.pokemon.id} value={p.id}>
                          {p.pokemon.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  {errors.pokemon?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                      {message}
                    </Alert>
                  ))}

                  <Form.Group className={styles.SelectWrapper}>
                    <div className={styles.SpriteBox}>
                      {selectedPokemonSprite && (
                        <>
                          <Image
                            src={selectedPokemonSprite}
                            alt={`${selectedPokemon} sprite`}
                          />
                        </>
                      )}
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

                          <Form.Group>
                            <EvStatOptions
                              handleChange={handleChange}
                              pokeBuildData={pokeBuildData}
                            />
                          </Form.Group>
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
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}

            </Container>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PokemonBuildCreateForm;