import React from 'react';
import {Navbar, Container, NavLink, Nav} from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/logo.png';



const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="lg">
    <Navbar.Brand href="#home"><img className={styles.Logo} src={logo}/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavLink className={styles.NavLink} href="#home">Home</NavLink>
      <NavLink href="#link">Feed</NavLink>
      <NavLink href="#link">PokéDex</NavLink>
    </Nav>
    <Nav className={styles.NavRight}>
      <NavLink className={styles.NavLink} href="#home">Sign Up</NavLink>
      <NavLink href="#link">Log In</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default NavBar