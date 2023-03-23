import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/BuildCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";


function PokemonBuildCreateForm() {
  return (
    <div className="mt-5">
        <Form>
            <Row>
                <Col>
                <Container>
                          <Form.Group controlId="pokemon-select">
                              <Form.Label>Select a Pokémon:</Form.Label>
                              <Form.Control
                                  as="select"
                              >
                                  <option value="">--Select a Pokémon--</option>
                                  <option >
                                      Caught pokemons
                                  </option>

                              </Form.Control>
                          </Form.Group>
                          <Form.Group >
                              <Form.Label>Other select fields here...</Form.Label>
                              <Form.Control
                                  as="select"
                              >
                                  <option value="">--Select --</option>
                                  <option >
                                      Values
                                  </option>
                              </Form.Control>
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