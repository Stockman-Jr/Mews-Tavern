import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const {
    profile_id,
    profile_avatar,
    owner,
    updated_at,
    content,
  } = props;
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
          <p className="ml-1 mr-1">{content}</p>
        </Media.Body >
      </div>
    </>
  );
}

export default Comment;