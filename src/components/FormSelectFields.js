import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";

const fetchAllData = async (url) => {
  let allData = [];
  let nextPage = url;

  while (nextPage) {
    const response = await await axiosReq.get(nextPage);
    allData = allData.concat(response.data.results);
    console.log(allData);
    nextPage = response.data.next;
  }
  return allData;
};

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
    </>
  );

};

export const FormFields = () => {
  const [nature, setNature] = useState([]);
  const [heldItem, setHeldItem] = useState([]);
  const fetchNatures = async () => {
    const url = '/api/natures/';
    const data = await fetchAllData(url);
    console.log(data.name);
    setHeldItem(data);
  };

  const fetchHeldItems = async () => {
    const url = '/api/held-items/';
    const data = await fetchAllData(url);
    console.log(data.name);
    setNature(data);
  };
  useEffect(() => {
    fetchHeldItems();
    fetchNatures();

  }, [])

  return (
    <>
    <div>
    <Form.Label htmlFor="nature">Select nature:</Form.Label>
    <Form.Control
      as="select"
      name="nature"


    >
      <option value="">--Select nature--</option>
      {nature.map((n) => (
        <option key={n.id} value={n.name}>
          {n.name}
        </option>
      ))}
    </Form.Control>
    </div>
    {/*

     {nature.map((n) => ( 
        <p key={n.id}>{n.name}</p>
      ))}
    <Form.Label htmlFor="nature">Select nature:</Form.Label>
    <Form.Control
      as="select"
      name="nature"
      value={nature}
      onChange={handleChange}
    >
      <option value="">--Select nature--</option>
      {natures.map((n) => (
        <option key={n.id} value={n.name}>
          {name}
        </option>
      ))}
    </Form.Control>
    */}
    </>
  );


}