import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/AuthForms.module.css";
import appStyles from "../../App.module.css";
import axios from 'axios';
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';

const SignInForm = () => {
    useRedirect("loggedIn");
    const setCurrentUser = useSetCurrentUser();
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });

    const {username, password} = signInData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await axios.post('/dj-rest-auth/login/', signInData);
        setCurrentUser(data.user);
        setTokenTimestamp(data);
        history.push('/');
        }catch(err){
            setErrors(err.response?.data);
        }
      };
  return (
    <Row className={`${appStyles.Row} ${styles.FormRow}`}>
    <Col className={` ${styles.FormContainer} my-auto `} md={8} lg={6}>
      <Container className={styles.Content}>
        <div className={styles.GradHeader}>
          <h4 className={styles.H4Text}>Log In</h4>
        </div>
        <Form onSubmit={handleSubmit} className={styles.AuthForm}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className={styles.FormInput}
              type="text"
              placeholder="Username"
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

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Button
            className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
            type="submit"
          >
            Log in
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
      <Link className={styles.Link} to="/signup">
        Not a member yet? <span>Sign up</span>
      </Link>
    </Container>
  </Row>
  )
}

export default SignInForm