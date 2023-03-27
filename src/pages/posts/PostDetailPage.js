import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Post from "./Post";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Container } from "react-bootstrap";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState({results: []});
  useEffect(() => {
    const handleMount = async () => {
      try {
          const [{ data: post }] = await Promise.all([
            axiosReq.get(`/posts/post/${id}/`),
          ]);
          setPost({ results: [post] });
          console.log(post);
        } catch (err) {
        console.log(err);
      }
  };
    handleMount();
  }, [id]);
  return (
    <Container>
    <Row className={"mt-5"}>
      <Col> 
        <Post {...post.results[0]} setposts={setPost} postPage />
      </Col>
    </Row>
    </Container>

  )
}

export default PostDetailPage;