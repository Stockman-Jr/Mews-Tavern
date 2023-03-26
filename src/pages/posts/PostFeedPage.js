import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Build from "./Build";

function PostFeedPage() {
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [builds, setBuilds] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axiosReq.get("/posts/post/");
      setPosts(data.results);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBuilds = async () => {
    try {
      const { data } = await axiosReq.get("/posts/pokebuild/");
      setBuilds(data.results);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
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
      fetchBuilds();
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
      {builds.map((build) => (
        <Build key={build.id} {...build} setBuilds={setBuilds} />
      ))}
      </Col>
    </Row>
    </Container>
  )
}

export default PostFeedPage;