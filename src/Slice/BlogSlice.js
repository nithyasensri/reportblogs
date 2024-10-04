
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'
import axios from 'axios'

// const Post_Url = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    allposts:[]
    // status: 'idle',
    // error: null
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({currentPage, limit}) => {
    // console.log(currentPage, limit)
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`)
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=2`)
    return response.data
})

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
//     return response.data
// })

export const addNewPosts = createAsyncThunk('posts/addNewPosts', async (initialPost,{currentPage, limit}) => {
    // console.log(currentPage)
    // const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, initialPost)
     const response = await axios.post(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`,initialPost)
     console.log(response.data)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    console.log(initialPost)
    const { id } = initialPost
    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, initialPost)
        return response.data
    }
    catch (err) {
        return err.message
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    console.log(initialPost)
    const { id } = initialPost
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, initialPost)
    return response.data
})

export const userlistPosts = createAsyncThunk('posts/lists',async()=>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // console.log(response.data)
    return response.data
})

const BlogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                console.log(action.payload)
                state.posts.push(action.payload)
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            rocket: 0,
                            thumpsUp: 0,
                            heart: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)
            console.log(existingPost)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },

    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeed"
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        rocket: 0,
                        thumpsUp: 0,
                        heart: 0
                    }
                    return post
                })
                console.log(loadedPosts)
                // state.posts = state.posts.concat(loadedPosts)
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewPosts.fulfilled, (state, action) => {
                console.log(action.payload)
                const sortedData = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                console.log(sortedData)
                action.payload.id = sortedData[sortedData.length - 1].id + 1
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    rocket: 0,
                    thumpsUp: 0,
                    heart: 0
                }
                state.posts.push(action.payload)
            })

            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((posts) => posts.id !== id)
                state.posts = [...posts, action.payload]
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                const { id } = action.payload
                const posts = state.posts.filter((post) => post.id === id)
                state.posts = posts
            })

            .addCase(userlistPosts.fulfilled,(state,action)=>{
                state.status = "succeed"
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        rocket: 0,
                        thumpsUp: 0,
                        heart: 0
                    }
                    return post
                })
                console.log(loadedPosts)
                // state.posts = state.posts.concat(loadedPosts)
                state.allposts = loadedPosts
            })

    }
})

export const SelectAllPosts = (state) => state.blogs.posts
export const SelectUserPosts = (state) => state.blogs.allposts
export const getPostsStatus = (state) => state.blogs.status
export const getPostsError = (state) => state.blogs.error
export const selectPostById = (state, postId) =>
    state.blogs.posts.find(post => post.id === postId)
export const { postAdded, reactionAdded } = BlogSlice.actions
export default BlogSlice.reducer
