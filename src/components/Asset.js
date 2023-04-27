import React from 'react';
import styles from "../styles/Asset.module.css";
import spinnerStyles from "../styles/Animations.module.css";
import Loader from "../assets/loader.png";


const Asset = ({ loader, src, message, style }) => {
    return (
        <div className={`${styles.Asset} p-4`}>
          {loader && <div className={spinnerStyles.Loader}>
            <img src={Loader} />
            </div>}
          {src && <img src={src} alt={message} />}
          {message && <p style={style} className={` ${styles.Message} mt-4`}>{message}</p>}
        </div>
      );
    };
    
    export default Asset;