import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import pageStyles from "../../styles/Pagination.module.css";

import PokemonCard from './PokemonCard';
import ArrowUp from '../../components/ArrowUp';
import Asset from "../../components/Asset";
import ReactPaginate from "react-paginate";
import { getGradientForTypes, pokeTypes } from "../../utils/utils";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from 'react-router-dom';

function PokeDexPage() {
  const [pokemons, setPokemons] = useState({ results: [] });
  const [caughtPokemons, setCaughtPokemons] = useState({ results: [] });
  const [pokemonsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");


  const { page } = useParams();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const owner = currentUser?.profile_id;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const { data } = await axiosReq.get(
          `/api/pokemons/?page=${page}&page_size=${pokemonsPerPage}&${filter}`
        );
        setPokemons(data);
        
        //Get the pokemon ids of the current page, then fetch any caught pokemon
        //the user has caught that match the ids
        const caughtPokemonIds = data.results.map((pokemon) => pokemon.id);
        if(currentUser) {
          const { data: caughtData } = await axiosReq.get(
            `/api/caught/?owner=${owner}&pokemon_ids=${caughtPokemonIds.join(",")}`
          );
          setCaughtPokemons(caughtData);
        }  
        setTotalPages(Math.ceil(data.count / pokemonsPerPage));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoaded(false);
    fetchPokemonData();
  }, [currentUser, page, pokemonsPerPage, owner, filter]);

  const handleTypeFilter = (type) => {
    setFilter(`types__name=${type}`);
    history.push("/pokedex/1");
  };

  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    history.push(`/pokedex/${newPage}`);
  };

  return (
    <div className="mt-5">
      {isLoaded ? (
        <Row className='m-0' >
          <Col lg={12}>
            <Container className={appStyles.BtnWrapper}>
              {pokeTypes.map((type) => (
                <Button
                  key={type}
                  variant="dark"
                  style={{
                    background: getGradientForTypes([type]),
                  }}
                  className={` ${btnStyles.TypeFilterBtn} mr-2 mb-2`}
                  onClick={() => handleTypeFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
              <Button
                variant="dark"
                className={btnStyles.ResetBtn}
                onClick={(e) => { setFilter(" ") }}
              >
                &#x2717; Reset
              </Button>
            </Container>
            <div className={`${appStyles.PContainer} mt-3`}>
              {pokemons.results.map((pokemon) => {
                const caughtPokemon = caughtPokemons.results.find(
                  (caught) => caught.pokemon.id === pokemon.id
                );
                const id = caughtPokemon?.id;
                return (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    id={id}
                    setCaughtPokemons={setCaughtPokemons}
                  />
                );
              })}
            </div>
          </Col>
          <ArrowUp />
          <Col>
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={"pagination justify-content-center"}
              breakClassName={pageStyles.BreakLink}
              pageClassName={pageStyles.PageItem}
              pageLinkClassName={pageStyles.PageLink}
              activeLinkClassName={pageStyles.ActivePage}
              previousClassName={pageStyles.PageItem}
              nextClassName={pageStyles.PageItem}
              previousLinkClassName={pageStyles.PageLink}
              nextLinkClassName={pageStyles.PageLink}
              forcePage={page - 1}
            />
          </Col>
        </Row>
      ) : (
        <Asset loader />
      )}
    </div>
  );
}

export default PokeDexPage;