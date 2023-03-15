import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/NavBar.module.css';
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
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>Log out</NavLink>
  </>;

  const loggedInLinks = <>
    <Nav.Link href="#link">Add Post</Nav.Link>
  </>;

  const loggedOutAuthLinks = <>
      <NavLink className={styles.NavLink} to="/signup">Sign Up</NavLink>
      <NavLink className={styles.NavLink} to="/signin">Log In</NavLink>
  </>;


  return (
    <Navbar className={styles.NavBar} expand="md">
    <NavLink to="/">
    <Navbar.Brand href="#home">
      <img className={styles.Logo} src={logo}/>
    </Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavLink className={styles.NavLink} to="/">Home</NavLink>
      <Nav.Link href="#link">Feed</Nav.Link>
      <Nav.Link href="#link">PokéDex</Nav.Link>
      {currentUser ? loggedInLinks : loggedOutAuthLinks}
    </Nav>
    <Nav className="ml-auto">
      {currentUser ? loggedInAuthLinks : loggedOutAuthLinks}
    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default NavBar