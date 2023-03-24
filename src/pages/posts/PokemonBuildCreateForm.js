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

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { PokeBuildFields } from "../../components/FormSelectFields";


function PokemonBuildCreateForm() {
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState("");
    const [pokeId, setPokeId] = useState(null);
    const [selectedMoves, setSelectedMoves] = useState([]);
    const [selectedAbilities, setSelectedAbilities] = useState("");
    const [selectedPokemonSprite, setSelectedPokemonSprite] = useState("");
    const [pokeBuildData, setPokeBuildData] = useState({
      pokemon: "",
      move_one: "",
      move_two: "",
      move_three: "",
      move_four: "",
      ability: "",
      ev_stats: "",
      content: "",
      post_type: "",
    });
    const {
      pokemon, 
      move_one, 
      move_two, 
      move_three,
      move_four, 
      ability, 
      ev_stats, 
      content} = pokeBuildData;
    const currentUser = useCurrentUser();
    const owner = currentUser;

    useEffect(() => {
    const fetchCaughtPokemons = async () => {
        try{
          const { data } = await axiosReq.get(`/api/caught/?owner=${owner.pk}`);
          const id = data.results.map((p) => p.id)
          setPokeId(id);
          setCaughtPokemons(data.results);
          
          
        }catch(err) {
          console.log(err);
        }
      };
      fetchCaughtPokemons();

    }, [owner, pokeId]);

    const handlePokemonSelect = async (event) => {
      const id = event.target.value;
      const { data } = await axiosReq.get(`/api/caught/${id}`);
      //const pokemon = data.pokemon;
    
      setSelectedPokemon(data.pokemon);
      setSelectedPokemonSprite(data.pokemon.sprite);
    
     // setPokeBuildData({
     //   ...pokeBuildData,
      //  pokemon: pokemon.name
     // });
     // console.log(pokeBuildData);
    };


      const handleChange = (event) => {
        setPokeBuildData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
        console.log(pokeBuildData);
      };

      const getInfo = async (e) => {
        e.preventDefault();
        const response = await axiosReq.options("/posts/pokebuild/");
        console.log(response.data.actions.POST);
        console.log(selectedPokemon);
        console.log(selectedPokemon.name);
        console.log(caughtPokemons.find((p) => p.pokemon === selectedPokemon.id));
        console.log(selectedMoves);
      };
  return (
    <div className={`${styles.BuildForm} mt-5 py-4`}>
        <Form>
            <Row className={appStyles.Row}>
                <Col>
                <Container>
                          <Form.Group controlId="pokemon-select">
                              <Form.Label>Select a Pokémon:</Form.Label>
                              <Form.Control
                                  as="select"
                                  name="pokemon"
                                  value={pokemon}
                                  onChange={(event) => {handlePokemonSelect(event); handleChange(event);}}
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
                 
                            <PokeBuildFields 
                            selectedPokemon={selectedPokemon} 
                            setSelectedPokemon={setSelectedPokemon}
                            selectedMoves={selectedMoves}
                            setSelectedMoves={setSelectedMoves}
                            selectedAbilities={selectedAbilities}
                            setSelectedAbilities={setSelectedAbilities}
                            />
                  
                          )}
                          </div>
                          </Form.Group>
                  

                          <Form.Group>
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                  as="textarea"
                                  name="content"
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

export default PokemonBuildCreateForm