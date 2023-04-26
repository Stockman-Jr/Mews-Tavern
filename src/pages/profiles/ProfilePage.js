import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";

import Post from "../posts/Post";
import Build from "../posts/Build";
import Asset from "../../components/Asset";
import PokeBall from "../../assets/ball-caught.png";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { fetchMoreData, getGradientForTypes } from "../../utils/utils";
import { NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

function ProfilePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState({ results: [] });
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const [likedPosts, setLikedPosts] = useState({ results: [] });
    const [profilePokemons, setProfilePokemons] = useState({ results: [] });
    const [activeLink, setActiveLink] = useState("posts");
    const currentUser = useCurrentUser();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [
              { data: profile },
              { data: profilePosts },
              { data: profilePokemons },
              { data: likedPosts },
            ] = await Promise.all([
              axiosReq.get(`/profiles/${id}/`),
              axiosReq.get(`/posts/?owner__trainerprofile=${id}`),
              axiosReq.get(`/api/caught/?owner__trainerprofile=${id}`),
              axiosReq.get(`/posts/?likes__owner__trainerprofile=${id}`),
            ]);
            setProfilePokemons(profilePokemons);
            setProfile(profile);
            setProfilePosts(profilePosts);
            setLikedPosts(likedPosts);
            console.log(profilePokemons.results);
            setIsLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [id, currentUser]);


    const handleLinkClick = (link) => {
      setActiveLink(link);
    };

    const caughtPokemon = (pokemon, types) => (
      <Card
        key={pokemon.id}
        className={`${styles.CaughtPokemon} mt-2 mb-3`}
        style={{
          background: getGradientForTypes(types),
        }}
      >
        <div className={styles.Poke}>
          <Image
            fluid
            className={styles.PokeImg}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.id}.png`}
          />
        </div>
        <div className={styles.PokeInfo}>
          <div className={styles.Inner}>
            <h6>{pokemon.pokemon.name}</h6>
            <Image src={PokeBall} />
            <small>
              <br />
              {pokemon.created_at}
            </small>
          </div>
        </div>
      </Card>
    );

    const renderProfileContent = () => {
      if (activeLink === "posts") {
          return (
            <>
            <div className={`${appStyles.CornerBox} mt-4`}></div>
            {profilePosts.results.length ? (
              <InfiniteScroll
              children={profilePosts.results.map((post) => {
                if (post.post_type === "Game Related") {
                  return (
                    <Post
                      key={post.id}
                      {...post}
                      setPosts={setProfilePosts}
                      style={{ width: 50 }}
                    />
                  );
                } else if (post.post_type === "Pokémon Build") {
                  return (
                    <Build key={post.id} {...post} setPosts={setProfilePosts} />
                  );
                }
              })}
              dataLength={profilePosts.results.length}
              loader={<Asset loader />}
              hasMore={!!profilePosts.next}
              next={() => fetchMoreData(profilePosts, setProfilePosts)}
              />
              ) : (
                <Asset src={NoResults}
                message={`Aww, ${profile?.owner} has not posted any content yet! `}
                />
              )}  
            </>
          );
      } else if (activeLink === "liked") {
          return(
            <>
            <div className={`${appStyles.CornerBox} mt-4`}></div>
            {likedPosts.results.length ? (
              <InfiniteScroll
              children={likedPosts.results.map((post) => {
                if (post.post_type === "Game Related") {
                  return (
                    <Post
                      key={post.id}
                      {...post}
                      setPosts={setLikedPosts}
                      style={{ width: 50 }}
                    />
                  );
                } else if (post.post_type === "Pokémon Build") {
                  return (
                    <Build key={post.id} {...post} setPosts={setLikedPosts} />
                  );
                }
              })}
              dataLength={likedPosts.results.length}
              loader={<Asset loader />}
              hasMore={!!likedPosts.next}
              next={() => fetchMoreData(likedPosts, setLikedPosts)}
              />
              ) : (
                <Asset src={NoResults}
                message={`Aww, ${profile?.owner} has not liked any content yet! `}
                />
              )}

            </>
          );
      } else if (activeLink === "pokemons") {
          return (
            <>
            <div className={`${appStyles.CornerBox} `}></div>
            <Col className={appStyles.PContainer} lg={12}>
            {profilePokemons.results.length ? (
              <InfiniteScroll
            
              dataLength={profilePokemons.results.length}
              loader={<Asset loader />}
              hasMore={!!profilePokemons.next}
              next={() => fetchMoreData(profilePokemons, setProfilePokemons)}
              >
                 {profilePokemons.results.map((pokemon) => {
                const types = pokemon.pokemon.types.map((type) =>
                type.toLowerCase()
              );
              return caughtPokemon(pokemon, types);
              })}
              </InfiniteScroll>
              ) : (
                <Asset src={NoResults}
                message={`Aww, ${profile?.owner} has not caught any pokémon yet! `}
                />
              )}    
              </Col>      
            </>
          );
      }
    };
  return (
    <>
    <header className={`${styles.ProfileHeader} ${appStyles.BeigeBg} ${appStyles.BorderBottom}`}>
    {profile && (
          <>
            <Image
              className={`${appStyles.Avatar} mt-4`}
              src={profile.avatar}
              alt="Avatar Image"
            />
            <h4>{profile.owner}</h4>
            <div>
              <small>{profile.name}</small>
              <small>{profile.bio}</small>
            </div>
          </>
        )}
         <div className={styles.MenuContent}>
          <Nav className={styles.ProfileMenu}>
            <Nav.Item className={styles.NavItem} >
              <Nav.Link onClick={() => handleLinkClick("posts")} >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.NavItem}>
            <Nav.Link onClick={() => handleLinkClick("liked")} >
                Liked
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.NavItem}>
              <Nav.Link onClick={() => handleLinkClick("pokemons")}>
                Pokémons
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
    </header>
    <div>
        <Container>
          {isLoaded ? (
            <>
            {profile && <Container>{renderProfileContent()}</Container> } 
             </>
          ) : (
            <Asset loader/>
          )}   
        </Container>
    </div>
    </>
  )
}

export default ProfilePage