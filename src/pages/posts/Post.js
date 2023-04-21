import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styles from "../../styles/PostCards.module.css";
import appStyles from "../../App.module.css";
import { TiHeartFullOutline} from "react-icons/ti";

import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { ConfigDropdown } from '../../components/DropdownMenus';
import { axiosRes } from '../../api/axiosDefaults';


const Post = (props) => {
    const {
      id,
      owner,
      profile_id,
      profile_avatar,
      comments_count,
      likes_count,
      like_id,
      title,
      content,
      image,
      game_filter_display,
      post_type,
      ingame_name,
      updated_at,
      postPage,
      setPosts,
    } = props;

    const [likesCount, setLikesCount] = useState(likes_count);
    const [likeId, setLikeId] = useState(like_id);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
    };

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/posts/post/${id}/`);
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    };


    const handleLike = async () => {
      try {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setLikesCount(likesCount + 1);
        setLikeId(data.id);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${like_id}/`);
        setLikesCount(likesCount - 1);
        setLikeId(null);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
  return (
      <>
    <Card className={styles.Card}>
      <Card.Header className={styles.GradHeader}>
        <Row className={styles.HeaderContent}>
          <Col>
            <Avatar src={profile_avatar} text={owner} />
          </Col>
          <Col>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
          </Col>
          <Col>
            {is_owner && postPage && (
              <ConfigDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Card.Header>
      <div className={styles.CardImg}>
        <Badge className={`${appStyles.Badge} ml-auto`}>{game_filter_display
        }</Badge>
        <Badge className={`${appStyles.Badge} ml-auto`}>{post_type}</Badge>
        <Link to={{ pathname: `/posts/${id}`, state: { post_type } }}>
          <Card.Img src={image} alt={title} />
        </Link>
      </div>
      <Card.Body>
        {content && <Card.Text className="text-center">{content}</Card.Text>}
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <span className={styles.UnLiked}>
                <TiHeartFullOutline />
              </span>
            </OverlayTrigger>
          ) : like_id ? (
            <span className={styles.Liked} onClick={handleUnlike}>
              <TiHeartFullOutline />
            </span>
          ) : currentUser ? (
            <span className={styles.UnLiked} onClick={handleLike}>
              <TiHeartFullOutline />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <span className={styles.UnLiked}>
                <TiHeartFullOutline />
              </span>
            </OverlayTrigger>
          )}

          {likes_count}

        </div>
      </Card.Body>

    </Card>
    <hr className={appStyles.HrDeco}/>
    </>
  )
};

export default Post;