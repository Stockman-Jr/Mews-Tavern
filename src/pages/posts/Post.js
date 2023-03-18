import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import styles from "../../styles/PostCards.module.css";
import appStyles from "../../App.module.css";

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

  return (
    <Card>
        <Card.Header><Avatar src={profile_image} text={owner} />
        <div className={styles.Right}>
        <Badge className={appStyles.Badge}>{post_type}</Badge>
        {is_owner && postPage && (
          <ConfigDropdown
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          />
        )}
        </div>  
        
        </Card.Header>
        <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
        <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {game_filter && <Card.Text>{game_filter}</Card.Text>}
        </Card.Body>

    </Card>
  )
};

export default Post;