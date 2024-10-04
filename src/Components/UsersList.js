import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../Slice/UserSlice';

const UsersList = ({ userId }) => {

    // console.log(userId)

    const users = useSelector(getAllUsers)

    const author = users.find((user) => user.id == userId)
 
    return (
        <div>
            
            {author ? author.name : 'unknown author'}
        </div>
    );
};

export default UsersList;