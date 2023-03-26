import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Build from "./Build";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState({results: []});
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/post/${id}/`),
          axiosReq.get(`/posts/pokebuild/${id}/`),
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
      <Post {...post.results[0]} setPosts={setPost} postPage />
      <Build {...post.results[0]} setBuilds={setPost} postPage />
      </Col>
    </Row>
  )
}

export default PostDetailPage;