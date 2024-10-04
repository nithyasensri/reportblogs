import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPostById } from '../Slice/BlogSlice';
import ImageList from './ImageList';
import Reactions from './Reactions';
import TimeAgo from './TimeAgo';
import UsersList from './UsersList';
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';

const SinglePost = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    // const post = useSelector((state)=>selectPostById(state,Number(postId)))

    return (

        <div className="flex-container">
            <Row className="postlist" style={{ "width": '94%', "padding": "50px" }}>
                <Col xs={4}>
                    <ImageList imagesId={post.id} />
                </Col>
                <Col xs={7}>
                    <h3>{post.title}</h3>
                    <Row>
                        <Col xs={6} className="user"> <UsersList userId={post.userId} /></Col>
                        <Col xs={6} className="timer"> <TimeAgo timeStamp={post.date} /></Col>
                    </Row>
                    <p>{post.body}</p>
                    <Reactions reactions={post} />
                    <Button variant="warning">
                        <Link to={`/edit/${post.id}`}>Edit Posts</Link>
                    </Button>{' '}
                </Col>
            </Row>
        </div>
    );
};

export default SinglePost;