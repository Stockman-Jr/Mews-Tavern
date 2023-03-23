import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostFeedPage() {
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/post/");
        setPosts(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);
  return (
    <Container className="mt-5">
    <Row>
      <Col className="mb-3">
      {posts.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
      </Col>
    </Row>
    </Container>
  )
}

export default PostFeedPage;