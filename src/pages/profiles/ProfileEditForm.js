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

import AvatarSelector from "./AvatarSelector";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const { name, bio, avatar } = profileData;
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [ selectedAvatar, setSelectedAvatar ] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, avatar } = data;
          setProfileData({ name, bio, avatar });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectAvatar = async (src) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const file = new File([blob], 'avatar.png', { type: 'image/png' });

    setSelectedAvatar(file);
    setProfileData({
      ...profileData,
      avatar:  URL.createObjectURL(blob),
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("avatar", selectedAvatar);

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_avatar: data.avatar,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };


  const formFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          value={bio}
          onChange={handleChange}
          rows={6}
        />
      </Form.Group>
      {errors.bio?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.name?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <div className={appStyles.BtnWrapper}>
        <Button
          className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
          type="submit"
        >
          Share
        </Button>
        <Button
          className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );


  return (
    <Container className="mt-5">
      <Form className={`${styles.ProfileForm} ${appStyles.BeigeBg}`} onSubmit={handleSubmit}>
        <Row>
          <Col lg={8} className="mx-auto">
          <Container>
          <Form.Group className="d-flex justify-content-center align-items-center flex-column">
          {showAvatarSelector ? (
                  <Modal
                    show={showAvatarSelector}
                    onHide={() => setShowAvatarSelector(false)}
                  >
                    <AvatarSelector
                      src={avatar}
                      onSelect={handleSelectAvatar}
                      setShowAvatarSelector={setShowAvatarSelector}
                    />
                  </Modal>
                ) : (
                  <>
                    {avatar && (
                      <div >
                        <figure >
                          <Image className={appStyles.Avatar} src={avatar} />
                        </figure>
                      </div>
                    )}
                  </>
                )}
                {!showAvatarSelector && (
                  <Button
                    className={`${btnStyles.CommentBtn} ${btnStyles.Dark}`}
                    onClick={() => setShowAvatarSelector(true)}
                  >
                    Select Avatar
                  </Button>
                )}
          </Form.Group>
          <div>{formFields}</div>
          </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default ProfileEditForm;