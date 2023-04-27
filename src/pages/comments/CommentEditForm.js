import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton className={styles.ModalHeader}>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.ModalBody}>
        <Form.Group className="pr-1">
          <Form.Control
            as="textarea"
            value={formContent}
            rows={2}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className={styles.ModalFooter}>
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