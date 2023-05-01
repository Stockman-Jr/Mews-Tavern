import React from 'react';
import NoResults from "../assets/no-results.png";
import styles from "../styles/PageNotFound.module.css";
import Asset from './Asset';

const PageNotFound = () => {
  return (
    <div className={styles.NotFound}>
        <Asset
        src={NoResults}
        message="Oops, seems like the page you were looking for doesn't exist." />
    </div>
  );
}

export default PageNotFound;