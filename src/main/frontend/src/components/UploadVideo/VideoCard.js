import React, { memo } from "react";
import ReactPlayer from 'react-player/lazy';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import './VideoContentArea.css';

const VideoCard = memo(({ video, playerRef }) => (
    <Card className="card">
        <CardContent className="c-cont">
            {/* 파일명 */}
            <Typography variant="h5" component="div">
                {video.name}
            </Typography>
            {/* 변경될 부분. 위험 정도를 색으로 알리는 아이콘 */}
            <div className="icon-cont">
                <CircleIcon className="circle" style={{color: "#E9C157"}}/>
                <CircleIcon className="circle" style={{color: "#00B69B"}}/>
            </div>
        </CardContent>
        {/* 영상 출력 */}
        <CardMedia >
            <ReactPlayer
                className='react-player'
                ref={playerRef} //시간 이동을 위해 필요
                url={URL.createObjectURL(video)}
                width='100%'
                playing={true} //자동재생
                muted={true} //음소거
                controls={true} //컨트롤러
                light={false} //컬러모드
                style={{backgroundColor:"black"}}
            />
        </CardMedia>
    </Card>
));

export default VideoCard;