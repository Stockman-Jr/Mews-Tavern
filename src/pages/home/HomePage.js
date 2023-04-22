import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Container from 'react-bootstrap/Container';
import Image from "react-bootstrap/Image";

import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css";
import CornerDecorations from '../../components/CornerDecorations';


function HomePage() {

    const [topPosts, setTopPosts] = useState({ results: [] });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axiosReq.get(
            "/posts/?ordering=-likes_count&page_size=5"
          );
          setTopPosts(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
    
  return (
    <>
          <div className={`${appStyles.CornerBox} ${appStyles.BorderBottom}`}>
              <CornerDecorations />
              <h1 className="mt-4 mb-4 text-center">Mew's Tavern</h1>
          </div>
          <div className={`${appStyles.BorderBottom} ${appStyles.BeigeBg}`}>
              <h2 className="text-center">Popular Posts</h2>
          </div>
          <div className={`${appStyles.CornerBox} ${styles.BorderStyle}`}>
              <CornerDecorations />
              <Row className={styles.InfoWrapper}>
                  <Col lg={12}>
                      <h2 className="pt-2 text-center">Latest News</h2>
                  </Col >
                  <Col className={`${styles.LeftCol} mb-3`} lg={9}>
                      <div className={styles.LeftInfo}>
                          <h4 className="pt-2 ">Game Updates</h4>
                          <p className={styles.GameUpdates}>
                              Pokémon Scarlet/Violet has finally announced the upcoming DLC,
                              containing Part 1: The Teal Mask and Part 2: The Indigo Disk.
                              And we've gotten a preview of the 5 new upcoming legendary
                              Pokémon! <br />
                              <br />
                              The game content will be released later this year but the DLC is
                              available for purchase in the Nintendo eShop now, where you can
                              get some new outfits and a Hisuian Zoroark!
                          </p>
                      </div>
                      <div className={styles.RightImg}>
                          <Image
                              fluid
                              src="https://scarletviolet.pokemon.com/_images/news/feb_27/teal_mask_art.jpg"
                          ></Image>
                      </div>
                  </Col>
                  <Col className={`${styles.RightCol} mb-3`} lg={9}>
                      <div className={styles.LeftInfo}>
                          <h4 className="pt-2 ">Ongoing Events</h4>
                          <p className={styles.GameEvents}>
                              There is also an ongoing Tera Raid Battle Event where you can
                              battle and catch the new Pokémons Walking Wake in Scarlet and
                              Iron Leaves in Violet!
                              <br /> Don't forget to share your builds an experiences! <br />
                       
                          </p>
                              <span className={styles.SiteLink}>
                                  Read all about the updates and events on the: {" "}
                                  <a
                              href="https://scarletviolet.pokemon.com/en-us/news/"
                              target="_blank"
                              rel="noreferrer"
                          >
                              Scarlet/Violet Official Site &#187;
                          </a>
                              </span>
               
                      </div>
                      <div className={styles.RightImg}>
                          <Image
                              fluid
                              src="https://staticc.sportskeeda.com/editor/2023/02/c9525-16775679439066-1920.jpg"
                          ></Image>
                      </div>
                  </Col>

              </Row>
          </div>
    </>
  )
}

export default HomePage;