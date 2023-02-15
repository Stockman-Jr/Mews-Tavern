import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    Form,
    Button,
    Col,
    Row,
    Container,
    Alert
  } from "react-bootstrap";
  import btnStyles from "../../styles/Buttons.module.css";
  import styles from "../../styles/SignInUpForm.module.css";
  import axios from 'axios';


const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: ''
    });

    const {username, password1, password2} = signUpData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            history.push('/signin')
        }catch(err){
            setErrors(err.response?.data)
        }
      };

  return (
    <Row className={styles.Row}>
      <h1 className="mb-5">Join The Fun!</h1>
      <Col className={` ${styles.FormContainer} my-auto `} md={8}>
        <Container className={styles.Content}>
          <div className={styles.GradHeader}>
            <h4 className={styles.H4Text}>Sign Up</h4>
          </div>
          <Form onSubmit={handleSubmit} className={styles.SignUp}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.FormInput}
                type="text"
                placeholder="Choose username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Repeat password"
              name="password2"
              value={password2}
              onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
              type="submit"
            >
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
      </Col>
      <Container className="mt-4">
        <Link className={styles.Link} to="/signin">
          Already a member? <span>Sign in</span>
        </Link>
      </Container>
    </Row>
  );
}

export default SignUpForm;