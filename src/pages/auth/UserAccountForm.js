import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";

import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/AuthForms.module.css";
import appStyles from "../../App.module.css";

import {
    useCurrentUser,
    useSetCurrentUser,
  } from "../../contexts/CurrentUserContext";
  import { axiosRes } from "../../api/axiosDefaults";

const UserAccountForm = () => {
  return (
    <Container className="mt-5">
        

    </Container>
  );
}

export default UserAccountForm;