import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const ProfileEditForm = () => {
  return (
    <Container className="mt-5">
      <Form className={` ${appStyles.BeigeBg}`}>
        <Row>
          <Col>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ProfileEditForm;