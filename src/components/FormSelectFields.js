import React, { useState } from "react";
import Form from "react-bootstrap/Form";

export const PokeBuildFields = ({ selectedPokemon, setSelectedPokemon }) => {
    const [selectedMoves, setSelectedMoves] = useState([]);
    const [selectedAbilities, setSelectedAbilities] = useState("");
  
    const handleMoveChange = (e) => {
      const move = e.target.value;
      if (selectedMoves.includes(move)) {
        setSelectedMoves(selectedMoves.filter((m) => m !== move));
      } else {
        setSelectedMoves([...selectedMoves, move]);
      }
    };
  
    const handleAbilityChange = (e) => {
      setSelectedAbilities(e.target.value);
    };

    return (
        <div>
          {selectedPokemon && (
            <>
              <Form.Group>
                <Form.Label htmlFor="move1-select">Select move 1:</Form.Label>
                <Form.Control
                  as="select"
                  id="move1-select"
                  value={selectedMoves[0]}
                  onChange={handleMoveChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move2-select">Select move 2:</Form.Label>
                <Form.Control
                  as="select"
                  id="move2-select"
                  value={selectedMoves[1]}
                  onChange={handleMoveChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move3-select">Select move 3:</Form.Label>
                <Form.Control
                  as="select"
                  id="move3-select"
                  value={selectedMoves[2]}
                  onChange={handleMoveChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
    
                <Form.Label htmlFor="move4-select">Select move 4:</Form.Label>
                <Form.Control
                  as="select"
                  id="move4-select"
                  value={selectedMoves[3]}
                  onChange={handleMoveChange}
                >
                  <option value="">--Select a move--</option>
                  {selectedPokemon.moves.map((move) => (
                    <option key={move} value={move}>
                      {move}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
    
              <Form.Label htmlFor="abilities-select">Select an ability:</Form.Label>
              <Form.Control
                as="select"
                id="abilities-select"
                value={selectedAbilities}
                onChange={handleAbilityChange}
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