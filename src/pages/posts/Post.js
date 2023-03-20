import React from 'react';
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
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        game_filter,
        post_type,
        updated_at,
        postPage,
        setPosts,
    } = props;

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
        const { data } = await axiosRes.post("/likes/", { post: id});
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      } catch(err) {
        console.log(err);
      }
    };

    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${like_id}/`);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.map((post) => {
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
    <Card className={styles.Card}>
      <Card.Header>
        <Row className={styles.HeaderContent}>
          <Col>
            <Avatar src={profile_image} text={owner} />
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
        <Badge className={`${appStyles.Badge} ml-auto`}>{game_filter
        }</Badge>
        <Badge className={`${appStyles.Badge} ml-auto`}>{post_type}</Badge>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
      </div>
      <Card.Body>
        {content && <Card.Text className="text-center">{content}</Card.Text>}
        <div>
          <span className={styles.Liked} onClick={handleLike}>
            <TiHeartFullOutline  />
          </span>
          <span className={styles.UnLiked}>
            <TiHeartFullOutline />
          </span>
          {likes_count}
        </div>
      </Card.Body>

    </Card>
  )
};

export default Post;