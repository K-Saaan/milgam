import React, { memo } from "react";
import ReactPlayer from 'react-player/lazy';
import { useTheme } from '@mui/material/styles';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';


const contStyle = (theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
});

const cardStyle = (theme) => ({
    marginBottom: '20px',
    border: `1px solid ${theme.palette.border.primary}`,
});

const iContStyle = (theme) => ({
    display: 'flex',
    alignItems: 'center',
});

const iconStyle = (theme) => ({
    width: '45%',
    marginLeft: '5px',
});

const VideoCard = memo(({ video, playerRef }) => {
    const theme = useTheme();

    return (
        <Card style={cardStyle(theme)}>
            <CardContent style={contStyle(theme)}>
                {/* 파일명 */}
                <Typography variant="h5" component="div">
                    {video.name}
                </Typography>
                {/* 변경될 부분. 위험 정도를 색으로 알리는 아이콘 */}
                <div style={iContStyle(theme)}>
                    <CircleIcon style={{...iconStyle(theme), color: "#E9C157"}}/>
                    <CircleIcon style={{...iconStyle(theme), color: "#00B69B"}}/>
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
    );
});

export default VideoCard;