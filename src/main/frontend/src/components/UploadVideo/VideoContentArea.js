import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./VideoContentArea.css";
import VideoCard from "./VideoCard.js";

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';


const paperStyle = (theme) => ({
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
  marginRight: 2,
  minHeight: '75vh',
});

const VideoContentArea = ({ playList, index, selectedItem }) => {
    const theme = useTheme();
    const {state} = useLocation();
    const playerRef = useRef(null);

    useEffect(() => {
        if (selectedItem && playerRef.current) {
            const timeString = selectedItem.time;
                if (timeString) {
                    const [minutes, seconds] = timeString.split(':').map(Number);
                    const totalTimeInSeconds = minutes * 60 + seconds;
                    playerRef.current.seekTo(totalTimeInSeconds);
                }
        }
    }, [selectedItem]);

    return (
        <Container sx={paperStyle(theme)}>
            <div className="v-cont">
                <VideoCard video={state.video} playerRef={playerRef}/>
                <div>{state.detail}</div>

                <div>
                    {selectedItem &&
                        <div>
                            <Divider style={{background: "#9797973D", marginTop:"20px",marginBottom:"20px"}}/>
                            <div>{selectedItem.details}</div>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
}

export default VideoContentArea;