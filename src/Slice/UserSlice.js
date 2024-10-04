
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const User_Url = "https://jsonplaceholder.typicode.com/users"

const initialState = []

export const fetchUsers = createAsyncThunk('posts/fetchUsers', async (state, action) => {
    const response = await axios.get(User_Url)
    return response.data
})

const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
    }
})
export const getAllUsers = (state) => state.users
export const selectUserById =(state,userId)=>{
    state.users.find(user => user.id === userId)
}
export default UserSlice.reducer