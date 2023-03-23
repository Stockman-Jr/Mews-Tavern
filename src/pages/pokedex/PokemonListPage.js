import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Container from "react-bootstrap/Container";
import PokemonCard from './PokemonCard';
import Asset from "../../components/Asset";

function PokemonListPage() {

  return (
    <div className="mt-5">
    <Row className='m-0' >
      <Col lg={12}>
        <Container>

            <PokemonCard  />

         
        </Container>
      </Col>

    </Row>
  </div>
  );
}

export default PokemonListPage;