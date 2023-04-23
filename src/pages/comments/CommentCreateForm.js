import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
    const { post, setPost, setComments } = props;
    const [content, setContent] = useState("");
  return (
    <div>
        <Form className="d-flex flex-column">
            <Form.Group>
                <InputGroup>
                <Form.Control
                placeholder="Add comment..."
                as="textarea"
                name="content"
                rows={2}
                value={content}
                />
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}

export default CommentCreateForm