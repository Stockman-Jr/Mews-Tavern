import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styles from "../../styles/PostCards.module.css";
import appStyles from "../../App.module.css";
import Avatar from '../../components/Avatar';
import CornerDecorations from "../../components/CornerDecorations";
import { TiHeartFullOutline} from "react-icons/ti";
import { ImBubbles2 } from "react-icons/im";

import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { capitalizeFirstLetter } from '../../utils/utils';
import { ConfigDropdown } from '../../components/DropdownMenus';
import { axiosRes } from '../../api/axiosDefaults';


const Build = (props) => {
    const {
      id,
      owner,
      profile_id,
      profile_avatar,
      comments_count,
      likes_count,
      like_id,
      pokemon,
      pokemon_sprite,
      move_one,
      move_two,
      move_three,
      move_four,
      ability,
      nature,
      held_item,
      ev_stats,
      content,
      post_type,
      updated_at,
      buildPage,
      homePage,
      game_filter_display,
      setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const wrapClassName = homePage ? styles.CarouselWrapper : null;
    const cardClassName = buildPage ? styles.DetailCard : styles.Card;

    const handleEdit = () => {
      history.push(`/posts/${id}/build/edit`)
    };

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/posts/pokebuild/${id}/`);
        history.goBack();
      } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
            {is_owner && buildPage && (
              <ConfigDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Card.Header>
      <Row className={`${styles.CardImgBox} ${appStyles.Row} p-1`}>
            <Col className={`${styles.InfoCol}`}>
              {pokemon && (
                <h6 className={`${styles.BuildTitle} text-center`}>
                  {capitalizeFirstLetter(pokemon)} Build
                </h6>
              )}
              <div
                className={`${styles.SpriteContainer} ${appStyles.CornerBox}`}
              >
                <CornerDecorations />
                <Link to={{ pathname: `/posts/${id}`, state: { post_type } }}>
                  <Image
                    fluid
                    className={styles.SpriteImg}
                    src={pokemon_sprite}
                  />
                </Link>
              </div>
              <div className={`${styles.BuildInfo}`}>
                <div className={styles.MovesSection}>
                  <strong
                    className={`text-center ${styles.BorderBottom} ${styles.TableHeader}`}
                  >
                    Moves
                  </strong>
                  {move_one && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      {capitalizeFirstLetter(move_one)}
                    </span>
                  )}
                  {move_two && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      {capitalizeFirstLetter(move_two)}
                    </span>
                  )}
                  {move_three && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      {" "}
                      {capitalizeFirstLetter(move_three)}
                    </span>
                  )}
                  {move_four && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      {" "}
                      {capitalizeFirstLetter(move_four)}
                    </span>
                  )}
                </div>

                <hr className={styles.Vertical} />

                <div className={styles.OtherSection}>
                  <strong
                    className={`text-center ${styles.BorderBottom} ${styles.TableHeader}`}
                  >
                    Other
                  </strong>
                  {nature && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      <strong>Nature:</strong> {capitalizeFirstLetter(nature)}
                    </span>
                  )}
                  {ability && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      <strong>Ability: </strong>{" "}
                      {capitalizeFirstLetter(ability)}
                    </span>
                  )}
                  {held_item && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      <strong>Held Item:</strong>{" "}
                      {capitalizeFirstLetter(held_item)}
                    </span>
                  )}
                  {ev_stats && (
                    <span
                      className={`${styles.InfoBadge} ${styles.BorderBottom}`}
                    >
                      <strong>EV stats: </strong>{" "}
                      {ev_stats
                        .map((stat) =>
                          stat
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())
                        )
                        .join(", ")}
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          {!homePage && content && (
            <Card.Body className={styles.Description}>
              <div>
                <Card.Text className="text-center">{content}</Card.Text>
              </div>
            </Card.Body>
          )}
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
          <span className={styles.CmtIcon}>
              <ImBubbles2 />            
          </span>
            {comments_count}
          <Badge className={`${appStyles.Badge} ml-auto`}>
              {game_filter_display}
            </Badge>
            <Badge className={`${appStyles.Badge} ml-auto`}>
              <strong>{post_type}</strong>
            </Badge>
        </div>
    </Card>
    {buildPage || homePage ? null : <hr className={appStyles.HrDeco} />}
    </div>
    </>
  )
};

export default Build;