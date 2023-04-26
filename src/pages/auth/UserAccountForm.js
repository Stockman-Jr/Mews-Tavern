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
    const setCurrentUser = useSetCurrentUser();
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const [newPassword, setNewPassword] = useState({
      new_password1: "",
      new_password2: "",
    });
  
    const { new_password1, new_password2 } = newPassword;
    const [username, setNewUsername] = useState("");
  
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
          setNewUsername(currentUser.username);
        } else {
          history.push("/");
        }
      }, [currentUser, history, id]);
    
      const handleChange = (event) => {
        setNewPassword({
          ...newPassword,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
          await axiosRes.put("/dj-rest-auth/user/", {
            username,
          });
          setCurrentUser((prevUser) => ({
            ...prevUser,
            username,
          }));
          history.goBack();
        } catch (err) {
          console.log(err);
          setErrors(err.response?.data);
        }
      };
    
      const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        try {
          await axiosRes.post("/dj-rest-auth/password/change/", newPassword);
          history.goBack();
        } catch (err) {
          console.log(err);
          setErrors(err.response?.data);
        }
      };
      
  return (
    <Container className="mt-5">
        <h6 className={` ${styles.H6Text} mb-4 text-center`}>
        Change username or password by clicking one of the tabs below.
      </h6>
      <Accordion className="mt-5" defaultActiveKey="0">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            className={`${styles.GradHeader} ${styles.AccordionToggle}`}
            eventKey="0"
          >
            <h5 className={`${styles.H4Text} text-center`}>Change Username</h5>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.Content}>
              <Form onSubmit={handleUsernameSubmit} className={styles.AuthForm}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className={styles.FormInput}
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(event) => setNewUsername(event.target.value)}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div className={appStyles.BtnWrapper}>
                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Card.Header}
            className={`${styles.GradHeader} ${styles.AccordionToggle}`}
            eventKey="1"
          >
            <h5 className={`${styles.H4Text} text-center`}>Change Password</h5>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body className={styles.Content}>
              <Form onSubmit={handlePasswordSubmit} className={styles.AuthForm}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    name="new_password1"
                    value={new_password1}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.new_password1?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat new password"
                    name="new_password2"
                    value={new_password2}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.new_password2?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
                <div className={appStyles.BtnWrapper}>
                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button
                    className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <hr className={appStyles.HrDeco} />
    </Container>
  );
}

export default UserAccountForm;