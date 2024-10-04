import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../Slice/BlogSlice';


const reactionEmoji = {

    thumpsUp: "👍",
    heart: "❤️",
    rocket: "🚀",
}


const Reactions = ({ reactions }) => {

    const dispatch = useDispatch()

    const reactionlists = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (<button key={name}
           onClick={()=>dispatch(reactionAdded({postId:reactions.id,reaction:name}))} >
            {emoji} {reactions.reactions[name]} </button>)
    })


    return (
        <div className="reactions">
            {reactionlists}
        </div>
    );
};

export default Reactions;