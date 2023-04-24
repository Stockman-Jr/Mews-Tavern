import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import PokemonCard from './PokemonCard';
import ArrowUp from '../../components/ArrowUp';
import Asset from "../../components/Asset";
import ReactPaginate from "react-paginate";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from 'react-router-dom';

function PokeDexPage() {
  const [pokemons, setPokemons] = useState({ results: [] });
  const [caughtPokemons, setCaughtPokemons] = useState({ results: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { page } = useParams();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const owner = currentUser?.profile_id;

  const fetchPokemonData = async () => {
    try {
      const { data } = await axiosReq.get(`/api/pokemons/?page=${page}&page_size=${pokemonsPerPage}`);
      setPokemons(data);
      setTotalPages(Math.ceil(data.count / pokemonsPerPage));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCaughtPokemons = async () => {
    try{
      const { data } = await axiosReq.get(`/api/caught/?owner=${owner.pk}`);
      setCaughtPokemons(data);       
    }catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrentPage(page);
    setIsLoaded(false);
    fetchPokemonData();
    fetchCaughtPokemons();
  }, [page, pokemonsPerPage, owner]);

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

export default PokeDexPage;