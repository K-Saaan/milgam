import React, { memo } from "react";
import ReactPlayer from 'react-player/lazy';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import './VideoContentArea.css';

const VideoCard = memo(({ video, playerRef }) => (
    <Card className="card">
        <CardContent className="c-cont">
            <Typography variant="h5" component="div">
                {video.name}
            </Typography>
            <div className="icon-cont">
                <CircleIcon className="circle" style={{color: "#E9C157"}}/>
                <CircleIcon className="circle" style={{color: "#00B69B"}}/>
            </div>
        </CardContent>

        <CardMedia >
            <ReactPlayer
                className='react-player'
                ref={playerRef}
                url={URL.createObjectURL(video)}
                width='100%'
                playing={true}
                muted={true}
                controls={true}
                light={false}
                style={{backgroundColor:"black"}}
            />
        </CardMedia>
    </Card>
));

export default VideoCard;