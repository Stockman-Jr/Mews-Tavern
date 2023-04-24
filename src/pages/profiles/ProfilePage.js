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

function ProfilePage() {
  return (
    <>
    <header>
         <div >
          <Nav >
            <Nav.Item >
              <Nav.Link >
                Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >
                Liked
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link >
                Caught pokémons
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