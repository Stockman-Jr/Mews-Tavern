import React from 'react';
import styles from "../styles/Asset.module.css";
import spinnerStyles from "../styles/Animations.module.css";


const Asset = ({ loader, src, message }) => {
    return (
        <div className={`${styles.Asset} p-4`}>
          {loader && <div className={spinnerStyles.Loader}></div>}
          {src && <img src={src} alt={message} />}
          {message && <p className="mt-4">{message}</p>}
        </div>
      );
    };
    
    export default Asset;