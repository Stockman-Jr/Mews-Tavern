import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import btnStyles from "../../styles/Buttons.module.css";
import modalStyles from "../../styles/Modals.module.css";

import { axiosRes } from "../../api/axiosDefaults";

function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;
    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axiosRes.put(`/comments/${id}/`, {
            content: formContent.trim(),
          });
          setComments((prevComments) => ({
            ...prevComments,
            results: prevComments.results.map((comment) => {
              return comment.id === id
                ? {
                    ...comment,
                    content: formContent.trim(),
                    updated_at: "now",
                  }
                : comment;
            }),
          }));
          setShowEditForm(false);
        } catch (err) {
          //console.log(err);
        }
      };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton className={modalStyles.ModalHeader}>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body className={modalStyles.ModalBody}>
        <Form.Group className="pr-1">
          <Form.Control
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className={modalStyles.ModalFooter}>
        <Button
          className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
          onClick={() => setShowEditForm(false)}
        >
          Close
        </Button>
        <Button
          className={`${btnStyles.FormBtn} ${btnStyles.Dark}`}
          type="submit"
        >
          Save
        </Button>
      </Modal.Footer>
    </Form>
  </>
  );
}

export default CommentEditForm;