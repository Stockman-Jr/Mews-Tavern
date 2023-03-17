import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css';
import btnStyles from '../styles/Buttons.module.css';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';



const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try{
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    }catch(err){
      console.log(err);
    }
  };

  const loggedInAuthLinks = <>
    <NavLink className={btnStyles.AuthBtn} to="/" onClick={handleSignOut}>Log out</NavLink>
  </>;

  const loggedInLinks = <>
    <NavLink to="/posts/create">Add Post</NavLink>
  </>;

  const loggedOutAuthLinks = <>
      <NavLink className={btnStyles.AuthBtn} to="/signup">Sign Up</NavLink>
      <NavLink className={btnStyles.AuthBtn} to="/signin">Log In</NavLink>
  </>;


  return (
    <Navbar className={styles.NavBar} expand="md">
    <NavLink to="/">
    <Navbar.Brand href="#home">
      <img className={styles.Logo} src={logo} alt="logo"/>
    </Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className={`${styles.NavLeft} mr-auto`}>
      <NavLink to="/" activeClassName={styles.Active} >Home</NavLink>
      <NavLink to="/posts">Feed</NavLink>
      <NavLink to="/pokedex">PokéDex</NavLink>
      {currentUser ? loggedInLinks : loggedOutAuthLinks}
    </Nav>
    <Nav className={`${styles.NavLeft} ml-auto`}>
      {currentUser ? loggedInAuthLinks : loggedOutAuthLinks}
    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default NavBar