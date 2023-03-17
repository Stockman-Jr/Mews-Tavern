import React from 'react';
import Card from 'react-bootstrap/Card';

import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../../contexts/CurrentUserContext';


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

  return (
    <Card>
        <Card.Header>{owner}</Card.Header>
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