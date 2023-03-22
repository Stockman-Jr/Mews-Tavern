import React from "react";
import styles from "../styles/CornerDecorations.module.css";

const Corners = () => {
  return (
    <>
      <div
        className={`${styles.Corner} ${styles.Corner3} ${styles.TopLeft}`}
      ></div>
      <div
        className={`${styles.Corner} ${styles.Corner3} ${styles.TopRight}`}
      ></div>

      <div
        className={`${styles.Corner} ${styles.Corner3} ${styles.BottomLeft}`}
      ></div>
      <div
        className={`${styles.Corner} ${styles.Corner3} ${styles.BottomRight}`}
      ></div>
    </>
  );
};

export default Corners;