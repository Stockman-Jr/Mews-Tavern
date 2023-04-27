import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { ConfigDropdown } from "../../components/DropdownMenus";

const Comment = (props) => {
  const {
    profile_id,
    profile_avatar,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };
  
  return (
    <>
      <hr className={styles.CmtHr} />
      <div className="d-flex flex-row">
        <Link to={`/profile/${profile_id}`}>
          <Avatar height={40} src={profile_avatar} />
        </Link>
        <span className={`d-flex flex-column align-items-center`}>
          <Link to={`/profile/${profile_id}`} className={styles.Owner}>
            {" "}
            {owner}{" "}
          </Link>{" "}
          <small className={styles.Updated}>{updated_at}</small>
        </span>
        <Media.Body  className={`${styles.CmtContent} ml-2 mb-1 mr-1`}>
        {showEditForm ? (
            <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            </Modal>
          ) : (
            <p className="ml-1 mr-1">{content}</p>
          )}
        </Media.Body>
        <div className={styles.CmtDropdown}>
          {is_owner && !showEditForm && (
            <ConfigDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>
      
      </div>
    </>
  );
}

export default Comment;