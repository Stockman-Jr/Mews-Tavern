import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostCreateEditForm.module.css";

import { Link } from "react-router-dom";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchGameFilterChoices } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";



function PostCreateForm() {
  useRedirect("loggedOut");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    game_filter: "",
    image: "",
    ingame_name: "",
    post_type: "Game Related",
  });
  const [gameFilterChoices, setGameFilterChoices] = useState([]);
  const { title, content, game_filter, image, ingame_name, post_type  } = postData;
  const imageInput = useRef(null);
  const history = useHistory();

  const [errors, setErrors] = useState({});


  useEffect(() => {
    const choices = JSON.parse(localStorage.getItem("gameFilterChoices"));
    if (choices) {
      setGameFilterChoices(choices);
    } else {
      fetchGameFilterChoices().then(setGameFilterChoices);
    }
  }, []);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });

  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("game_filter", game_filter);
    formData.append("ingame_name", ingame_name);
    formData.append("image", imageInput.current.files[0]);
    formData.append("post_type", post_type);

    try {
      const { data } = await axiosReq.post("/posts/post/", formData);
      history.push({
        pathname: `/posts/${data.id}`,
        state: { post_type: post_type },
      });
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    
  };

  const formFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

      <Form.Group>
        <Form.Label>Ingame name</Form.Label>
        <Form.Control
          type="text"
          name="ingame_name"
          value={ingame_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.ingame_name?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group>       
        <Form.Control
          as="select"
          name="game_filter"
          value={game_filter}
          onChange={handleChange}
        >
          <option value="">--Choose game--</option>
          {gameFilterChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>{choice.display_name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors.game_filter?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

      <Button
        className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
        type="submit"
      >
        Share
      </Button>
    </div>
  );

  return (
    <Container className="mt-5"> 
     <div className="mb-4">
        <Link
          to="/posts/create/build"
          className={`${btnStyles.FormBtn} ${btnStyles.Dark} p-2`}
        >
          Pokémon Build &#11166;
        </Link>
      </div>
      <Form onSubmit={handleSubmit} className={styles.PostForm}>
        <Row className={styles.FormContent}>
          <Col >
            <Container >
              <Form.Group>
                {image ? (
                  <>
                  <div className={styles.ImgBox}>
                    <figure >
                      <Image className={appStyles.Image} src={image} />
                    </figure>
                    </div>
                    <div className="text-center">
                      <Form.Label
                        className={`${btnStyles.FormButton} ${btnStyles.Dark} btn`}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center align-items-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload image"
                      style={{ color: '#35322b'}}
                    />
                  </Form.Label>
                )}

                <Form.Control
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors.image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
              <div className={` ${styles.FormFieldDiv} d-lg-none `}>
                {formFields}
              </div>
            </Container>
          </Col>
          
          <Col md={5} lg={4} className="d-none d-lg-block p-0 p-md-2">
            <Container className={` ${styles.FormFieldDiv} `}>
              {formFields}
            </Container>
          </Col>
        </Row>
      </Form>
      </Container>
  )
}

export default PostCreateForm;