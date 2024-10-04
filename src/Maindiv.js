import React from 'react';
import { SelectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './Slice/BlogSlice'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './Components/PostList';
import ReactPaginate from "react-paginate";

const Maindiv = () => {

  const dispatch = useDispatch()

  const posts = useSelector(SelectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)


  console.log(posts)
  const [items, setItems] = useState([])
  const [pageCount, setpageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 2;

  const handlePageClick = (posts) => {
    // console.log(posts.selected);
    setCurrentPage(posts.selected + 1)
  };
  // console.log(currentPage)

  useEffect(() => {
    
        dispatch(fetchPosts({currentPage,pageCount}))
        // dispatch(fetchPosts())
    
}, [dispatch,currentPage])

  // useEffect(() => {
  //     dispatch(fetchPosts()) 
  // }, [currentPage])

  let content = ''

  if (postStatus === "loading") {
    content = <p>{ }</p>
  }
  else if (postStatus === "succeed") {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    // content = orderedPosts.map((post) => <PostList key={post.id} post={post} />)
    content = orderedPosts.map((post) => <PostList key={post.id} post={post} />)
  }
  else if (postStatus === "failed") {
    content = <p>{error}</p>
  }

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  content = orderedPosts.map((post) => <PostList key={post.id} post={post} />)

  return (
    <div>
      <div className=''>
        {content}
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Maindiv;