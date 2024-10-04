import React from 'react';
import { useSelector } from 'react-redux';
import { getAllImages } from '../Slice/ImageSlice';

const ImageList = ({imagesId}) => {
const images = useSelector(getAllImages) 
const imageList = images.find(image => image.id === imagesId)

    return (
        <div className="postlist-image">
            {imageList ? <img src={imageList.url} alt="img"/> : ""}
        </div>
    );
};

export default ImageList;