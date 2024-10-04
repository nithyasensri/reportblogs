import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from './BlogSlice'

const initialState = {
    currentPage: 1,
    totalPages: 1,
    data: [],
    status: 'idle',
    error: null,
};



export const fetchPostsPerPage = createAsyncThunk(
    'pagination/fetchPostsPerPage',
    async (pageNumber) => {
      const response = await fetchPosts(pageNumber);
      return response;
    }
  );
  

const PaginationSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPostsPerPage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostsPerPage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchPostsPerPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const getAllPages = (state) => state.pagination
export default PaginationSlice.reducer