import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostCreateEditForm.module.css";

import { Link } from "react-router-dom";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";


function PostCreateForm() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    game_filter: "",
    image: "",
  });
  const { title, content, game_filter, image } = postData;
  const imageInput = useRef(null);
  const history = useHistory();

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

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>


      <Button
        className={`${btnStyles.FormBtn} ${btnStyles.Dark} mt-2`}
        type="submit"
      >
        Share
      </Button>
    </div>
  );

  return (
    <div>
      <div>
        <Link
          to="/posts/create/build"
          className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
        >
          Create Pokémon Build
        </Link>
      </div>

      <Form>
        <Row>
          <Col>
            <Container>
              <Form.Group>
                <figure>
                  <Image className={appStyles.Image} src={image} />
                </figure>
              </Form.Group>
            </Container>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PostCreateForm;