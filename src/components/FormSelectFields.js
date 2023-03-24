import React, { useEffect, useState } from "react";
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
        </div>
      );
};

export const FieldOptions = ({handleChange}) => {
  const [fieldOptions, setGetFieldOptions] = useState([]);
  const [options] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axiosReq.options("/posts/pokebuild/");
      const choices = data.actions.POST.ev_stats.choices;
      setGetFieldOptions(choices);
    };
    getOptions();
  }, []);

  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;

    if (checked) {
      if (checkedCount < 2) {
        setCheckedCount((count) => count + 1);
        handleChange(event);
      } else {
        event.preventDefault();
        alert("first");
      }
    } else {
      setCheckedCount((count) => count - 1);
      handleChange(event);
    }
  };

  const getInfo = async (e) => {
    e.preventDefault();
    const { data } = await axiosReq.options("/posts/pokebuild/");
    const choices = data.actions.POST.ev_stats.choices;
    console.log(choices[0]);
    console.log(data.actions.POST.ev_stats);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="evStats">
        {fieldOptions.map((option) => (
          <Form.Check
          key={option.value}
          type="checkbox" 
          label={option.display_name}
          name="ev_stats"
          value={option.value}
          onChange={handleCheckboxChange}
          disabled={checkedCount >= 2 && !option.value}
  
          />
        ))}     
      </Form.Group>

      <button onClick={getInfo}>click</button>
    </>
  );

};