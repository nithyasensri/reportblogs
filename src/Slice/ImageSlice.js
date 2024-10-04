import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const Images_Url ="https://jsonplaceholder.typicode.com/photos?_limit=100"

const initialState =[]

export const fetchImages = createAsyncThunk('images/fetchImages',async(state,action)=>{
    const response = await axios.get(Images_Url)
    return response.data
})

const ImageSlice = createSlice({
    name:'images',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchImages.fulfilled,(state,action)=>{
            return action.payload
        })
    }
    
})

export const getAllImages = (state) => state.images
export default ImageSlice.reducer