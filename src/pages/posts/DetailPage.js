import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/DetailPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";

import Post from "./Post";
import Build from "./Build";

import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function DetailPage() {
  return (
    <Container className="mt-5">
        <Row>
            <Col>
            </Col>
        </Row>
    </Container>
  )
}

export default DetailPage