

import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './Slice/BlogSlice'
import UserReducer from './Slice/UserSlice'
import ImageReducer from './Slice/ImageSlice'

const store = configureStore({
    reducer: {
        blogs: BlogReducer,
        users:UserReducer,
        images:ImageReducer,
    }
})

export default store