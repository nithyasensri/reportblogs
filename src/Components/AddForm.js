import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPosts } from '../Slice/BlogSlice';
import { getAllUsers } from '../Slice/UserSlice'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const AddForm = () => {

    const dispatch = useDispatch()
    const users = useSelector(getAllUsers)
    // console.log(users)

    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [userId, setuserId] = useState()

    const addPost = (e) => {
        e.preventDefault()
        // console.log(title, body, userId)
        if (title && body) {
            dispatch(addNewPosts({ title, body, userId })).unwrap()
        }
        setTitle('')
        setBody('')
        setuserId('')
        navigate("/")
    }

    const userlist = users.map((user) => {
        return (<option key={user.id} value={user.id}>{user.name}</option>)
    })

    const cansave = Boolean(title) && Boolean(body) && Boolean(userId)

    return (
        <div className="flex-container">
            <Row className="addform">
            <Form onSubmit={addPost}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Title
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Title"
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
                            <Form.Control type="text" placeholder="decsription"
                                onChange={(e) => setBody(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Button variant="warning" type='submit' disabled={!cansave}
                        style={{ padding: '10px' }}>Add Posts
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default AddForm;