import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/DetailPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";

import Post from "./Post";
import Build from "./Build";

import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const { post_type } = location.state;
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                if (location.state && location.state.post_type === "Game Related") {
                    const [{ data: post }] = await Promise.all([
                        axiosReq.get(`/posts/post/${id}/`),
                    ]);
                    setPost({ results: [post] });
                    console.log(post);
                } else if (
                    location.state &&
                    location.state.post_type === "Pokémon Build"
                ) {
                    const [{ data: post }] = await Promise.all([
                        axiosReq.get(`/posts/pokebuild/${id}/`),
                    ]);
                    setPost({ results: [post] });
                    console.log(post);
                }
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id, location]);
  return (
      <Container className="mt-5">
          <Row>
              <Col>
                  {post_type === "Game Related" ? (
                      <Post {...post.results[0]} setPosts={setPost} postPage />
                  ) : (
                      <Build {...post.results[0]} setPosts={setPost} buildPage />
                  )}
              </Col>
          </Row>
      </Container>
  )
}

export default DetailPage