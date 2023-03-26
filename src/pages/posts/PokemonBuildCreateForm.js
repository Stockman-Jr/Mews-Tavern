import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import styles from "../../styles/BuildCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { PokeBuildFields, FieldOptions, FormFields } from "../../components/FormSelectFields";


function PokemonBuildCreateForm() {
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [pokeId, setPokeId] = useState(null);
    const [selectedPokemonSprite, setSelectedPokemonSprite] = useState("");
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
        const id = data.results.map((p) => p.id)
        setPokeId(id);
        setCaughtPokemons(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCaughtPokemons();

  }, [owner, pokeId]);

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
    formData.append("content", content);
    formData.append("post_type", post_type);

    try {
      const { data } = await axiosReq.post("/posts/pokebuild/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const getInfo = async (e) => {
    e.preventDefault();
    const response = await axiosReq.options("/posts/pokebuild/");
    console.log(response.data.actions.POST);
    console.log(selectedPokemon);
    console.log(selectedPokemon.name);
    console.log(caughtPokemons.find((p) => p.pokemon === selectedPokemon.id));
  };
  return (
    <div className={`${styles.BuildForm} mt-5 py-4`}>
      <Form onSubmit={handleSubmit}>
        <Row className={appStyles.Row}>
          <Col>
            <Container>
              <Form.Group controlId="pokemon-select">
                <Form.Label>Select a Pokémon:</Form.Label>
                <Form.Control
                  as="select"
                  name="pokemon"
                  value={pokemon}
                  onChange={(event) => { handlePokemonSelect(event); handleChange(event); }}
                >
                  <option value="">--Select a Pokémon--</option>
                  {caughtPokemons.map((p) => (
                    <option key={p.pokemon} value={p.id}>
                      {p.pokemon_name}
                    </option>
                  ))}

                </Form.Control>
              </Form.Group>

              <Form.Group className={styles.SelectWrapper}>
                <div className={styles.SpriteBox}>
                  {selectedPokemonSprite && (
                    <>
                      <span>{selectedPokemon.name}</span>
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
                      <PokeBuildFields
                        selectedPokemon={selectedPokemon}
                        setSelectedPokemon={setSelectedPokemon}
                        handleChange={handleChange}

                      />

                      <Form.Group>
                      <FieldOptions handleChange={handleChange} />
                      </Form.Group>
                    </>
                  )}
                </div>
              </Form.Group>
              <FormFields handleChange={handleChange} />



              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="content"
                  value={content}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                type="submit"
              >
                Share
              </Button>

              <Button
                className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                onClick={getInfo}
              >
                Info
              </Button>


            </Container>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PokemonBuildCreateForm;