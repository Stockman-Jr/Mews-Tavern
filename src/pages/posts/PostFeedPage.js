import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostFeedPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState({ results: [] });
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/post/`),
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
    <Row>
      <Col>
      </Col>
    </Row>
  )
}

export default PostFeedPage;