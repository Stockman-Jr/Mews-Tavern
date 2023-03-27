import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Build from "./Build";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


function PostFeedPage() {
  const { pathname, postType } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [builds, setBuilds] = useState([]);

  const fetchData = async () => {
    try {
      const { data: postData } = await axiosReq.get("/posts/post/");
      setPosts(postData.results);

      const { data: buildData } = await axiosReq.get("/posts/pokebuild/");
      setBuilds(buildData.results);

      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
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