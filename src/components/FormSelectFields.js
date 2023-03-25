import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";
import { fetchAllData, fetchDataChoices } from "../utils/utils";

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
        alert("Please select two stats!");
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
    </>
  );

};

export const FormFields = ({ handleChange, nature, held_item }) => {
  const [natureList, setNatureList] = useState([]);
  const [heldItemList, setHeldItemList] = useState([]);

  const fetchNatures = async () => {
    const url = '/api/natures/';
    const data = await fetchAllData(url);
    setNatureList(data);
  };

  const fetchHeldItems = async () => {
    const url = '/api/held-items/';
    const data = await fetchAllData(url);
    setHeldItemList(data);
  };
  useEffect(() => {
    fetchHeldItems();
    fetchNatures();

  }, [])

  return (
    <>
    <Form.Label htmlFor="nature">Select nature:</Form.Label>
    <Form.Control
      as="select"
      id="nature"
      name="nature"
      value={nature}
      onChange={handleChange}
    >
      <option value="">--Select nature--</option>
      {natureList.map((n) => (
        <option key={n.id} value={n.id}>
          {n.name}
        </option>
      ))}
    </Form.Control>

    <Form.Label htmlFor="held_item">Select held item:</Form.Label>
    <Form.Control
      as="select"
      id="held_item"
      name="held_item"
      value={held_item}
      onChange={handleChange}
    >
      <option value="">--Select held item--</option>
      {heldItemList.map((n) => (
        <option key={n.id} value={n.id}>
          {n.name}
        </option>
      ))}
    </Form.Control>
    </>
  );
}


export const GameFilterChoices = ({ handleChange }) => {
  const [options] = useState([]);

  return (
    <div>
    <Form.Label htmlFor="game_filter">Select nature:</Form.Label>
    <Form.Control
      as="select"
      name="game_filter"
    >
      <option value="">--Select nature--</option>
 
        <option >
        
        </option>
 
    </Form.Control>
    </div>
  );




}