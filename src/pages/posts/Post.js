import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styles from "../../styles/PostCards.module.css";
import appStyles from "../../App.module.css";
import Avatar from '../../components/Avatar';
import { TiHeartFullOutline} from "react-icons/ti";
import { IoLogoGameControllerB } from "react-icons/io";
import { ImBubbles2 } from "react-icons/im";

import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
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
      postPage,
      homePage,
      setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const wrapClassName = homePage ? styles.CarouselWrapper : '';
    const cardClassName = postPage ? styles.DetailCard : styles.Card;

    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
    };

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/posts/post/${id}/`);
        history.goBack();
      } catch (err) {
        //console.log(err);
      }
    };


    const handleLike = async () => {
      try {
        const { data } = await axiosRes.post("/likes/", { post: id });
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      } catch (err) {
        //console.log(err);
      }
    };
  
    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${like_id}/`);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      } catch (err) {
        //console.log(err);
      }
    };
  return (
    <>
    <div className={wrapClassName}>
      <Card className={cardClassName}>
        <Card.Header className={styles.GradHeader}>
          <Row className={styles.HeaderContent}>
            <Col>
             <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_avatar} />
                {owner}
              </Link>
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
        <div className={styles.CardImgBox}>
          <Link to={{ pathname: `/posts/${id}`, state: { post_type } }}>
            <Card.Img className={styles.CardImg} src={image} alt={title} />
          </Link>
        </div>
        <Card.Body className={styles.Description}>
          <div className="mt-1 text-center">
            {title && <strong className="text-center">{title}</strong>}
            {content && (
              <Card.Text className="text-center">{content}</Card.Text>
            )}
          </div>
          {ingame_name ? (
            <span className={styles.IngameName}>
              <IoLogoGameControllerB />
              {ingame_name}
            </span>
          ) : null}
        </Card.Body>
        <div className={styles.CardFooter}>
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
          {" "}
          <span className={styles.CmtIcon}>
              <ImBubbles2 />            
            </span>
            {comments_count}
          <Badge className={`${appStyles.Badge} ml-auto`}>
            {game_filter_display}
          </Badge>
          <Badge className={`${appStyles.Badge} ml-auto`}>
          {post_type}
          </Badge>
        </div>
      </Card>
      {postPage || homePage ? null : <hr className={appStyles.HrDeco} />}
      </div>
    </>
  )
};

export default Post;