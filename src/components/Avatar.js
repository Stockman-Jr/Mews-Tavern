import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;