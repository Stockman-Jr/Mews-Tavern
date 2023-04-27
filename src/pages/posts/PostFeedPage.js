import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import styles from "../../styles/PostFeedPage.module.css";

import Post from "./Post";
import Build from "./Build";
import ArrowUp from "../../components/ArrowUp";
import Asset from "../../components/Asset";
import { FcSearch } from "react-icons/fc";

import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";


function PostFeedPage() {
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState({ results: [] });
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get( `/posts/?search=${query}&${filter}`);
        setPosts(data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setIsLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, filter, query]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


return (
  <Row className="mt-5 mr-0 ml-0">
     <Col className={styles.SearchFilterBox} lg={12}>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="d-flex flex-row">
            <FcSearch />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mb-2"
              placeholder="Search posts.."
            />
          </div>
        </Form>
        <Form.Control as="select" value={filter} onChange={handleFilterChange}>
          <option value="">All Posts</option>
          <option value="post_category=post">Game Related</option>
          <option value="post_category=pokebuild">Pokemon Builds</option>
        </Form.Control>
      </Col>
  <Container className="mt-3">
          <Col className="mb-3 mt-4" lg={12}>
            {isLoaded ? (
            <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => {
                  if (post.post_type === "Game Related") {
                    return (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    );
                  } else if (post.post_type === "Pokémon Build") {
                    return (
                      <Build key={post.id} {...post} setPosts={setPosts} />
                    );
                  }
                })}
                dataLength={posts.results.length}
                loader={<Asset loader />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container>No posts...</Container>
            )}
          </>
            ) : (
              <Container>
                <Asset loader />
              </Container>
            )}
          </Col>
          <ArrowUp />
        </Container>
      </Row>
  );
}

export default PostFeedPage;