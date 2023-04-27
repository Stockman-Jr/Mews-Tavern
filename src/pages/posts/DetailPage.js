import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/DetailPage.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { CgAdd } from "react-icons/cg";

import Post from "./Post";
import Build from "./Build";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";

import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";


function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const { post_type } = location.state;
    const [post, setPost] = useState({ results: [] });
    const [comments, setComments] = useState({ results: [] });
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                if (location.state && location.state.post_type === "Game Related") {
                    const [{ data: post }] = await Promise.all([
                        axiosReq.get(`/posts/post/${id}/`),
                    ]);
                    setPost({ results: [post] });
                } else if (
                    location.state &&
                    location.state.post_type === "Pokémon Build"
                ) {
                    const [{ data: post }] = await Promise.all([
                        axiosReq.get(`/posts/pokebuild/${id}/`),
                    ]);
                    setPost({ results: [post] });
                }
                const [{ data: comments }] = await Promise.all([
                    axiosReq.get(`/comments/?post=${id}`),
                  ]);
          
                  setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id, location]);

    const handleLoadMore = (e) => {
        e.preventDefault();
        fetchMoreData(comments, setComments);
      };

  return (
      <Container className="mt-5">
          <Row >
              <Col className={styles.PostContainer} lg={8} md={12}>
                  {post_type === "Game Related" ? (
                      <Post {...post.results[0]} setPosts={setPost} postPage />
                  ) : (
                      <Build {...post.results[0]} setPosts={setPost} buildPage />
                  )}
              </Col>
              <Col
          className={`${styles.CommentContainer} flex-grow-1 overflow-auto p-0`}
          lg={4}
          md={12}
        >
          <p className={`${styles.CmtTitle} mt-2 mb-0`}>Comments</p>
          {comments.results.length ? (
            <>
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
                className={`${styles.CmtBox} ${appStyles.BorderBottom}`}
                dataLength={comments.results.length}
                hasMore={!!comments.next}
              />
              <div className={styles.LoadMoreBox}>
                <span
                  onClick={handleLoadMore}
                  className={`${btnStyles.LoadMoreBtn}`}
                >
                  Load More{" "}
                  <strong className={appStyles.Icons}>
                    <CgAdd />
                  </strong>
                </span>
              </div>
            </>
          ) : (
            <p className="text-white text-center mt-1">No comments yet.. </p>
          )}
        </Col>
              <Container className="mt-3 mb-3">
                  {currentUser ? (
                      <CommentCreateForm
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                      />
                  ) : (
                      <p className="text-white">Log In or Sign Up to leave comments!</p>
                  )}
              </Container>
              <hr className={appStyles.HrDeco} />
          </Row>  
      </Container>
  )
}

export default DetailPage