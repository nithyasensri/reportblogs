import React from 'react';
import UsersList from './UsersList';
import ImageList from './ImageList'
import TimeAgo from './TimeAgo';
import Reactions from './Reactions';
import { Link } from 'react-router-dom';
import { Row, Col,Button } from 'react-bootstrap';

const PostList = ({ post }) => {
    return (
        <div className="flex-container">
            <Row className="postlist">
                <Col  sm={4} xs={12}>
                    <ImageList imagesId={post.id} />
                </Col>
                <Col sm={7} xs={12}>
                    <h3>{post.title}</h3>
                    <Row>
                        <Col md={6} sm={12} xs={12} className="user"> <UsersList userId={post.userId} /></Col>
                        <Col md={6} sm={12} xs={12} className="timer"> <TimeAgo timeStamp={post.date} /></Col>
                    </Row>
                    <p>{post.body}</p>
                    <Reactions reactions={post} />
                    <Button variant="warning">
                        <Link to={`/post/${post.id}`}>View Posts</Link>
                    </Button>{' '}
                </Col>
            </Row>
        </div>
    );
};

export default PostList;