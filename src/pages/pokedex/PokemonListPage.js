import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Container from "react-bootstrap/Container";
import PokemonCard from './PokemonCard';

function PokemonListPage() {
  return (
    <div className="mt-5">
    <Row >
      <Col lg={12}>
        <Container className={appStyles.PContainer} >
          <PokemonCard />
        </Container>
      </Col>

    </Row>
  </div>
  );
}

export default PokemonListPage;