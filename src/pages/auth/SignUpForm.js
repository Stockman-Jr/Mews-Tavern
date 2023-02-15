import React from 'react';
import { Link } from "react-router-dom";
import {
    Form,
    Button,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
  import btnStyles from "../../styles/Buttons.module.css";
  import styles from "../../styles/SignInUpForm.module.css";


const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <h1 className="mb-5">Join The Fun!</h1>
      <Col className={` ${styles.FormContainer} my-auto `} md={8}>
        <Container className={styles.Content}>
          <div className={styles.GradHeader}>
            <h4 className={styles.H4Text}>Sign Up</h4>
          </div>
          <Form className={styles.SignUp}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.FormInput}
                type="text"
                placeholder="Choose username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>

            <Button
              className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Col>
      <Container className="mt-4">
        <a href="#" className={styles.Link}>
          Already a member? <span>Sign in</span>
        </a>
      </Container>
    </Row>
  );
}

export default SignUpForm;