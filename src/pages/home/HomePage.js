import React from 'react';
import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css";
import CornerDecorations from '../../components/CornerDecorations';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function HomePage() {
  return (
    <>
          <div className={`${appStyles.CornerBox} ${styles.BorderStyle}`}>
              <CornerDecorations />
              <h1 className="mt-5 mb-3 text-center">Mew's Tavern</h1>
          </div>
          <div className={"mt-4"}>
              <h2 className="text-center">Top shared content</h2>
          </div>
          <div className={`${appStyles.CornerBox} ${styles.BorderStyle}`}>
              <CornerDecorations />
              <Row className={styles.InfoWrapper}>
                  <Col lg={12}>
                      <h2 className="pt-3 text-center">Latest News</h2>
                  </Col >
                  <Col className={`${styles.LeftCol} mb-3`} lg={9}>
                      <div className={styles.LeftInfo}>
                          <h4 className="pt-3 ">Game Updates</h4>
                          <p>Latest Game updates here</p>
                      </div>
                  </Col>
                  <Col className={`${styles.RightCol} mb-3`} lg={9}>
                      <div className={styles.LeftInfo}>
                          <h4 className="pt-3 ">Ongoing Events</h4>
                          <p>Latest Ongoing Events here</p>
                      </div>
                  </Col>

              </Row>
          </div>
    </>
  )
}

export default HomePage;