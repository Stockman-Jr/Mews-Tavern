import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PokemonCard from './PokemonCard';
import ArrowUp from '../../components/ArrowUp';
import { useParams } from 'react-router-dom';

function PokemonListPage() {

  const { page } = useParams();

  return (
    <div className="mt-5">
      <Row className='m-0' >
        <Col lg={12}>
          <Container>
            <PokemonCard page={page} />
          </Container>
        </Col>
        <ArrowUp />
      </Row>
    </div>
  );
}

export default PokemonListPage;