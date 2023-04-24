import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import Post from "../posts/Post";
import Build from "../posts/Build";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';

function ProfilePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState({ results: [] });
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const [likedPosts, setLikedPosts] = useState({ results: [] });
    const [profilePokemons, setProfilePokemons] = useState({ results: [] });
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
            setIsLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [id, currentUser]);
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
              <Nav.Link >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.NavItem}>
              <Nav.Link >
                Liked
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.NavItem}>
              <Nav.Link >
                Pokémons
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
    </header>
    <div>
        <Container>
            Content here
        </Container>
    </div>
    </>
  )
}

export default ProfilePage