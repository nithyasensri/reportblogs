import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../Slice/UserSlice';
import { Link } from 'react-router-dom';
import { Row} from 'react-bootstrap';

const ListUsers = () => {
    const users = useSelector(getAllUsers)
    const userList = users.map((user) => {
        return (<li key={user.id}>
            <Link to={`/list/${user.id}`}>{user.name}</Link>
        </li>)
    })
    return (
        <div className="flex-container">
            <Row className="userslist">
                <ul>{userList}</ul>
            </Row>
        </div>
    );
};

export default ListUsers;