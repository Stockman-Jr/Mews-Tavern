import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";

export const PokeBuildFields = ({ selectedPokemon, setSelectedPokemon, handleChange }) => {
    const [options] = useState([]);

    return (
        <div>
          {selectedPokemon && (
            <>
              <Form.Group>
                <Form.Label htmlFor="move_one">Select move 1:</Form.Label>
                <Form.Control
                  as="select"
                  id="move_one"
                  name="move_one"     
                  value={options[0]}
                  onChange={handleChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move_two">Select move 2:</Form.Label>
                <Form.Control
                  as="select"
                  id="move_two"
                  name="move_two"
                  value={options[1]}
                  onChange={handleChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move_three">Select move 3:</Form.Label>
                <Form.Control
                  as="select"
                  id="move_three"
                  name="move_three"
                  value={options[2]}
                  onChange={handleChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move_four">Select move 4:</Form.Label>
                <Form.Control
                  as="select"
                  id="move_four"
                  name="move_four"
                  value={options[3]}
                  onChange={handleChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
    
              <Form.Label htmlFor="abilitiy">Select an ability:</Form.Label>
              <Form.Control
                as="select"
                id="ability"
                name="ability"
                value={options[4]}
                onChange={handleChange}
              >
                <option value="">--Select an ability--</option>
                {selectedPokemon.abilities.map((ability) => (
                  <option key={ability} value={ability}>
                    {ability}
                  </option>
                ))}
              </Form.Control>
            </>
          )}

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
        
      </Form.Group>
        </div>
      );
};

export const FieldOptions = () => {
  const [fieldOptions, setGetFieldOptions] = useState([]);

  const getInfo = async (e) => {
    e.preventDefault();
    const { data } = await axiosReq.options("/posts/pokebuild/");
    const choices = data.actions.POST.ev_stats.choices;
    setGetFieldOptions(choices);
    console.log(choices[0]);
    console.log(data.actions.POST.ev_stats);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="evStats">
        <Form.Check type="radio" label="Check me out" />
        
      </Form.Group>
    </>
  );

};