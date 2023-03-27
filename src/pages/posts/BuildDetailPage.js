import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Build from "./Build";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function BuildDetailPage() {
  const { id } = useParams();
  const [build, setBuild] = useState({results: []});
  useEffect(() => {
    const handleMount = async () => {
      try {
          const [{ data: build }] = await Promise.all([
            axiosReq.get(`/posts/pokebuild/${id}/`),
          ]);
          setBuild({ results: [build] });
        } catch (err) {
        console.log(err);
      }
  };
    handleMount();
  }, [id]);
  return (
    <Row>
      <Col> 
        <Build {...build.results[0]} setBuilds={setBuild} buildPage />
      </Col>
    </Row>
  )
}

export default BuildDetailPage;