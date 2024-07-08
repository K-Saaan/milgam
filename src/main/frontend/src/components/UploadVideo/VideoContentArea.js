import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./VideoContentArea.css";
import VideoCard from "./VideoCard.js";

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

// 배경 스타일
const paperStyle = (theme) => ({
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
  marginRight: 2,
  minHeight: '75vh',
});

// 영상 분석 결과 좌측 영역
const VideoContentArea = ({ selectedItem }) => {
    const theme = useTheme();
    const {state} = useLocation();
    const playerRef = useRef(null);

    // 선택 항목에 따라 영상 시간 조절 처리
    useEffect(() => {
        if (selectedItem && playerRef.current) {
            // 문자열 타입의 시간을 초 단위로 변환
            const timeString = selectedItem.time;
                if (timeString) {
                    const [minutes, seconds] = timeString.split(':').map(Number);
                    const totalTimeInSeconds = minutes * 60 + seconds;
                    // 영상 시간 이동
                    playerRef.current.seekTo(totalTimeInSeconds);
                }
        }
    // 선택 항목 바뀔 때 작동
    }, [selectedItem]);

    return (
        <Container sx={paperStyle(theme)}>
            <div className="v-cont">
                {/* 파일명, 영상 출력 부분 */}
                <VideoCard video={state.video} playerRef={playerRef}/>
                {/* 기입한 영상 내용 */}
                <div>{state.detail}</div>
                {/* 선택한 항목이 있을 때 그 내용 출력 */}
                {selectedItem &&
                    <div>
                        <Divider style={{background: "#9797973D", marginTop:"20px",marginBottom:"20px"}}/>
                        <div>{selectedItem.details}</div>
                    </div>
                }
            </div>
        </Container>
    );
}

export default VideoContentArea;