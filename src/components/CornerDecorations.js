import React from "react";
import styles from "../styles/CornerDecorations.module.css";

const CornerDecorations = () => {
  return (
    <>
          <div
              className={`${styles.Corner} ${styles.CornerStyle} ${styles.TopLeft}`}
          ></div>
          <div
              className={`${styles.Corner} ${styles.CornerStyle} ${styles.TopRight}`}
          ></div>

          <div
              className={`${styles.Corner} ${styles.CornerStyle} ${styles.BottomLeft}`}
          ></div>
          <div
              className={`${styles.Corner} ${styles.CornerStyle} ${styles.BottomRight}`}
          ></div>
    </>
  );
};

export default CornerDecorations;