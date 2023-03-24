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

      const getSelectPokemon = async (id) => {
        try {
          const { data } = await axiosReq.get(`/api/caught/${id}`);
          setSelectedPokemon(data.pokemon);
          setSelectedPokemonSprite(data.pokemon.sprite);
          console.log(data.pokemon);
        } catch (error) {
          console.log(error);
        }
        
      };


      const handlePokemonSelect = (e) => {
        const id = e.target.value; 
        console.log(id);
        getSelectPokemon(id);
      };

      const getInfo = (e) => {
        e.preventDefault();
        console.log(selectedPokemon);
        console.log(selectedPokemon.name);
        console.log(caughtPokemons.find((p) => p.pokemon === selectedPokemon.id));
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
                                  value={pokeId}
                                  onChange={handlePokemonSelect}
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
                                      <Image
                                          src={selectedPokemonSprite}
                                          alt={`${selectedPokemon} sprite`}
                                      />
                                  )}
                              </div>
                              <div className={styles.SelectBox}>
                          {selectedPokemon && (
                 
                            <PokeBuildFields selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                  
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
        
                </Container>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default PokemonBuildCreateForm