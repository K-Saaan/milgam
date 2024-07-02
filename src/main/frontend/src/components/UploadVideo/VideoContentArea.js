import React from "react";
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import "./VideoContentArea.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';


const VideoContentArea = ({playList, index}) => {
    const {state} = useLocation();

    return (
        <div className="v-cont">
            <Card className="card">
                <CardContent className="c-cont">
                    <Typography variant="h5" component="div">
                      {state.video.name}
                    </Typography>
                    <div className="icon-cont">
                        <CircleIcon className="circle" style={{color: "#E9C157"}}/>
                        <CircleIcon className="circle" style={{color: "#00B69B"}}/>
                    </div>
                </CardContent>

                <CardMedia >
                    <ReactPlayer
                        className='react-player'
                        url={URL.createObjectURL(state.video)}
                        width='100%' height='100%'
                        playing={true}
                        muted={true}
                        controls={true}
                        light={false}
                    />
                </CardMedia>
            </Card>
            <div>{state.detail}</div>

            <Divider style={{background: "#9797973D", marginTop:"20px",marginBottom:"20px"}}/>

            <div>
                내용상세
            </div>
        </div>
    );
}

export default VideoContentArea;