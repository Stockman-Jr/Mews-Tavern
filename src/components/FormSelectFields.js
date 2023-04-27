import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../api/axiosDefaults";
import { fetchAllData, fetchBuildSelectData } from "../utils/utils";

export const MoveFields = ({  
  selectedPokemon,
  setSelectedPokemon,
  handleChange,
  pokeBuildData, }) => {

    return (
      <div>
      {setSelectedPokemon && (
        <>
          <Form.Group>
            <Form.Label htmlFor="move_one">Select move 1:</Form.Label>
            <Form.Control
              as="select"
              name="move_one"
              value={pokeBuildData.move_one}
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
              value={pokeBuildData.move_two}
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
              value={pokeBuildData.move_three}
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
              value={pokeBuildData.move_four}
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
          
          <Form.Group>
          <Form.Label htmlFor="abilitiy">Select an ability:</Form.Label>
          <Form.Control
            as="select"
            id="ability"
            name="ability"
            value={pokeBuildData.ability}
            onChange={handleChange}
          >
            <option value="">--Select an ability--</option>
            {selectedPokemon.abilities.map((ability) => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
          </Form.Control>
          </Form.Group>
        </>
      )}
    </div>
      );
};

export const EvStatOptions = ({handleChange, pokeBuildData}) => {
  const [fieldOptions, setGetFieldOptions] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axiosReq.options("/posts/pokebuild/");
      const choices = data.actions.POST.ev_stats.choices;
      setGetFieldOptions(choices);
      setCheckedOptions(pokeBuildData.ev_stats);
    };
    getOptions();
  }, [pokeBuildData.ev_stats]);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    let updatedOptions = [...checkedOptions];

    if (checked) {
      if (checkedOptions.length < 2) {
        updatedOptions.push(value);
      } else {
        event.preventDefault();
        alert("Please select two stats!");
      }
    } else {
      updatedOptions = updatedOptions.filter((option) => option !== value);
    }

    setCheckedOptions(updatedOptions);
    handleChange({
      target: {
        name: "ev_stats",
        value: updatedOptions,
      },
    });
  };

  return (
    <>
    <Form.Group controlId="evStats">
      {fieldOptions.map((option) => (
        <Form.Check
          key={option.value}
          type="checkbox"
          label={option.display_name}
          name="ev_stats"
          value={option.value}
          checked={checkedOptions.includes(option.value)}
          onChange={handleCheckboxChange}
        />
      ))}
    </Form.Group>
  </>
  );

};

export const FormFields = ({
  handleChange,
  pokeBuildData,
  }) => {
  const [natureList, setNatureList] = useState([]);
  const [heldItemList, setHeldItemList] = useState([]);

  useEffect(() => {
    const storedNatures = localStorage.getItem("natureData");
    const storedItems = localStorage.getItem("heldItemsData");

    if (storedNatures && storedItems) {
      setNatureList(JSON.parse(storedNatures));
      setHeldItemList(JSON.parse(storedItems));
    } else {
      fetchBuildSelectData().then(data => {
        setNatureList(data.natureData);
        setHeldItemList(data.heldItemsData);
      });
    }
  }, []);

  return (
    <>
     <Form.Group>
      <Form.Label htmlFor="nature">Select nature:</Form.Label>
      <Form.Control
        as="select"
        id="nature"
        name="nature"
        value={pokeBuildData.nature}
        onChange={handleChange}
      >
        <option value="">--Select nature--</option>

        {natureList.map((n) => (
          <option key={n.id} value={n.name}>
            {n.name}
          </option>
        ))}
      </Form.Control>
      </Form.Group>
      <Form.Group>
      <Form.Label htmlFor="held_item">Select held item:</Form.Label>
      <Form.Control
        as="select"
        id="held_item"
        name="held_item"
        value={pokeBuildData.held_item}
        onChange={handleChange}
      >
        <option value="">--Select held item--</option>
        {heldItemList.map((n) => (
          <option key={n.id} value={n.name}>
            {n.name}
          </option>
        ))}
      </Form.Control>
      </Form.Group>
    </>
  );
};
