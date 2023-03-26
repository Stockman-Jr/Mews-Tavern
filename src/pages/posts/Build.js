import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Table from 'react-bootstrap/Table';


import styles from "../../styles/PostCards.module.css";
import appStyles from "../../App.module.css";
import { TiHeartFullOutline} from "react-icons/ti";

import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { capitalizeFirstLetter } from '../../utils/utils';
import Avatar from '../../components/Avatar';
import { ConfigDropdown } from '../../components/DropdownMenus';
import { axiosRes } from '../../api/axiosDefaults';


const Build = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        pokemon, 
        move_one, 
        move_two, 
        move_three,
        move_four, 
        ability,
        nature,
        held_item,
        content,
        game_filter,
        post_type,
        updated_at,
        postPage,
        setBuilds,
    } = props;

    const [postLikesCount, setPostLikesCount] = useState(likes_count);
    const [postLikeId, setPostLikeId] = useState(like_id);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
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
        setPostLikesCount(postLikesCount + 1);
        setPostLikeId(data.id);
      } catch (err) {
        console.log(err);
      }
    };

    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${postLikeId}/`);
        setPostLikesCount(postLikesCount - 1);
        setPostLikeId(null);
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
            <Avatar src={profile_image} text={owner} />
          </Col>
          <Col>
            {pokemon && <Card.Title className="text-center">{capitalizeFirstLetter(pokemon)} Build</Card.Title>}
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
      
      <Row className={`${styles.CardImg} ${appStyles.Row} p-2`}>
        
        <Col className={styles.SpriteContainer} sm={12} md={6} lg={4}>
        <Link to={`/posts/${id}`}>
          <Image fluid className={styles.SpriteImg} src={`https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`} />          
        </Link>
        </Col>
        <Col className={styles.InfoCol} sm={12} md={6} lg={8}>
          <div className={`${styles.BuildInfo}`}>
        <strong className={`text-center ${styles.BorderBottom} ${styles.TableHeader}`}>Moves</strong>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}>{capitalizeFirstLetter(move_one)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}>{capitalizeFirstLetter(move_two)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}> {capitalizeFirstLetter(move_three)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}> {capitalizeFirstLetter(move_four)}</span>
        </div>
        <hr />
        <div className={styles.BuildInfo}>
        <strong className={`text-center ${styles.BorderBottom} ${styles.TableHeader}` }>Other</strong>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}><strong className={`${styles.TableHeader} pt-1`}>Nature:</strong> {capitalizeFirstLetter(nature)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}><strong>Held Item:</strong>  {capitalizeFirstLetter(held_item)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}><strong>Ability: </strong> {capitalizeFirstLetter(ability)}</span>
        <span className={`${styles.InfoBadge} ${styles.BorderBottom}`}><strong>EV stats: </strong> {capitalizeFirstLetter(ability)}</span>
        </div>
        </Col>
      </Row>
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
          ) : postLikeId ? (
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

          {postLikesCount}

        </div>
      </Card.Body>

    </Card>
    <hr className={appStyles.HrDeco}/>
    </>
  )
};

export default Build;