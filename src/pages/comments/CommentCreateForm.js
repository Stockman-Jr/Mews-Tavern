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

    const handleChange = (event) => {
        setContent(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await axiosRes.post("/comments/", {
            content,
            post,
          });
          setComments((prevComments) => ({
            ...prevComments,
            results: [data, ...prevComments.results],
          }));
          setPost((prevPost) => ({
            results: [
              {
                ...prevPost.results[0],
                comments_count: prevPost.results[0].comments_count + 1,
              },
            ],
          }));
          setContent("");
        } catch (err) {
          console.log(err);
        }
      };

    return (
    <div className={styles.Content}>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup className={styles.CommentWrapper}>
                <Form.Control
                placeholder="Add comment..."
                as="textarea"
                name="content"
                rows={2}
                value={content}
                onChange={handleChange}
                />
                </InputGroup>
            </Form.Group>
            <Button
          className={`${btnStyles.CommentBtn} ${btnStyles.Dark} mt-2`}
          type="submit"
        >
          Add
        </Button>
        </Form>
    </div>
  );
}

export default CommentCreateForm;