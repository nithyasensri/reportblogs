import React from 'react';
import {parseISO,formatDistanceToNow} from 'date-fns'

const TimeAgo = ({timeStamp}) => {
    let timeAgo =''

    if(timeStamp){
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
        // console.log(timeAgo)
    }

    return (
        <div >
           {timeAgo} 
        </div>
    );
};

export default TimeAgo;