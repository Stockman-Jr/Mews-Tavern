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


function PostCreateForm() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

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