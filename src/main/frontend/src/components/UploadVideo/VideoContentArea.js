import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import VideoCard from "./VideoCard.js";

import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { Container, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CustomTableCell, tableHeaderStyle } from '../Styles/CustomTable'

// 배경 스타일
const paperStyle = (theme) => ({
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
  marginRight: 2,
  minHeight: '65vh',
});

const contStyle = (theme) => ({
  margin: '20px',
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
            <div sx={contStyle(theme)}>
                {/* 파일명, 영상 출력 부분 */}
                <VideoCard video={state.video} playerRef={playerRef}/>
                {/* 기입한 영상 내용 */}
                <Divider style={{background: theme.palette.divider, marginTop: "30px"}}/>
                <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
                    <Table>
                        <TableHead sx={tableHeaderStyle(theme)}><TableRow>
                            <CustomTableCell>영상 내용</CustomTableCell>
                            <CustomTableCell>구역</CustomTableCell>
                            <CustomTableCell>카메라</CustomTableCell>
                            <CustomTableCell>시각</CustomTableCell>
                        </TableRow></TableHead>
                        <TableBody><TableRow>
                            <CustomTableCell>{state.data.detail || '-'}</CustomTableCell>
                            <CustomTableCell>{state.data.sector || '-'}</CustomTableCell>
                            <CustomTableCell>{state.data.camera || '-'}</CustomTableCell>
                            <CustomTableCell>{state.data.time || '-'}</CustomTableCell>
                        </TableRow></TableBody>
                    </Table>
                </TableContainer>
                {/* 선택한 항목이 있을 때 그 내용 출력 */}
                {selectedItem &&
                    <div>
                        <Divider style={{background: theme.palette.divider, marginTop: "30px", marginBottom: "30px"}}/>
                        <div>{selectedItem.details}</div>
                    </div>
                }
            </div>
        </Container>
    );
}

export default VideoContentArea;