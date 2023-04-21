import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 60, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        height={height}
        width={height}
        src={src}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;