import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { SelectAllPosts, SelectUserPosts, userlistPosts } from '../Slice/BlogSlice'
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { selectUserById } from '../Slice/UserSlice';


const UsersPostlist = () => {
    const { userId } = useParams()
    const user = useSelector(state=>selectUserById(state,Number(userId)))
    const dispatch =useDispatch()

    const postsForUser = useSelector(state=>{
        const allposts = SelectUserPosts(state)
        return allposts.filter(post=> post.userId ===Number(userId))
    })

    useEffect(()=>{
        dispatch(userlistPosts())
    },[])

    const postTitle = postsForUser.map((post)=>(
        <li key="post.id">{post.title}</li>
    ))
   

    console.log(postTitle)
    return (
        <div className="flex-container">
            <Row className="userslist">
            <h2>{user?.name}</h2>
            <ol>{postTitle}</ol>
            </Row>
        </div>
    );
};

export default UsersPostlist;