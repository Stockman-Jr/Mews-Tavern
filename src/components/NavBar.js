import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';



const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="lg">
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
    </Nav>
    <Nav className={styles.NavRight}>
      <NavLink className={styles.NavLink} to="/signup">Sign Up</NavLink>
      <NavLink className={styles.NavLink} to="/signin">Log In</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default NavBar