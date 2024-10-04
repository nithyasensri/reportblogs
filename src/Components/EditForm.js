import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../Slice/UserSlice';
import { updatePost, deletePost } from '../Slice/BlogSlice';
import { selectPostById } from '../Slice/BlogSlice';
import { Row, Col, Button,Form } from 'react-bootstrap';

const EditForm = () => {
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const dispatch = useDispatch()
    const users = useSelector(getAllUsers)
    console.log(post)

    const navigate = useNavigate()

    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body)
    const [userId, setuserId] = useState(post.userId)


    const cansave = Boolean(title) && Boolean(body) && Boolean(userId)

    const addPost = (e) => {
        e.preventDefault()
        if (cansave) {
            try {
                dispatch(updatePost({
                    id: post.id, title, body, userId,
                    reactions: post.reactions
                })).unwrap()

                setTitle('')
                setBody('')
                setuserId('')
                navigate(`/post/${postId}`)
            }

            catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    const delPost = () => {
        dispatch(deletePost({
            id: post.id
        })).unwrap()

        navigate('/')
    }

    const userlist = users.map((user) => {
        return (<option key={user.id} value={user.id}>{user.name}</option>)
    })



    return (
        <div className="flex-container">
            <Row className="postlist" style={{ "width": '50%', "padding": "50px" }}>
                <Form onSubmit={addPost}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Title
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Author
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select aria-label="Default select example"
                                value={userId} onChange={(e) => setuserId(e.target.value)}>
                                <option></option>
                                {userlist}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Body
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="decsription" value={body}
                                onChange={(e) => setBody(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Button variant="warning" type='submit' disabled={!cansave}
                        style={{ padding: '10px' }}>Update Post
                    </Button>
                    <Button variant="warning" type='submit'  onClick={delPost}
                        style={{ padding: '10px',"marginLeft":'10px' }}>Delete Posts
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default EditForm;