import React, { useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import VideoCard from "./VideoCard.js";

import { useTheme } from '@mui/material/styles';
import { Container, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
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
const VideoContentArea = ({ selectedItem, isClicked }) => {
    const theme = useTheme();
    const { state } = useLocation();
    const playerRef = useRef(null);

    // 선택 항목에 따라 영상 시간 조절 처리
    useEffect(() => {
        if (selectedItem && playerRef.current) {
            // 문자열 타입의 시간을 초 단위로 변환
            const timeString = selectedItem.timestamp;
                if (timeString) {
                    // 초와 밀리초를 분리 (예: "12.345" -> 12초, 345밀리초)
                    const [secondsPart, millisecondsPart] = timeString.split('.').map(Number);
                    const milliseconds = millisecondsPart || 0;

                    // 밀리초를 반올림하여 총 초를 계산
                    const totalTimeInSeconds = secondsPart + Math.round(milliseconds / 1000);

                    // 비디오의 총 길이 가져오기 (예: playerRef.current.getDuration() 사용)
                    const videoDuration = playerRef.current.getDuration();
                    // 영상 길이를 넘어가는 경우, 영상 끝부분으로 이동
                    const seekTime = Math.min(totalTimeInSeconds, videoDuration);

                    // 영상 시간 이동
                    playerRef.current.seekTo(seekTime);
                }
        }
    // 선택 항목 바뀔 때 작동
    }, [selectedItem, isClicked]);

    return (
        <Container style={paperStyle(theme)}>
            <div style={contStyle(theme)}>
                {/* 파일명, 영상 출력 부분 */}
                <VideoCard video={state.video} playerRef={playerRef} />
                {/* 기입한 영상 내용 */}
                <Divider style={{ background: theme.palette.divider, marginTop: "30px" }} />
                <TableContainer component={Paper} style={{ marginTop: "30px" }}>
                    <Table>
                        <TableHead style={tableHeaderStyle(theme)}>
                            <TableRow>
                                <CustomTableCell>영상 내용</CustomTableCell>
                                <CustomTableCell>구역</CustomTableCell>
                                <CustomTableCell>카메라</CustomTableCell>
                                <CustomTableCell>시각</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <CustomTableCell>{state.data.detail || '-'}</CustomTableCell>
                                <CustomTableCell>{state.data.sector || '-'}</CustomTableCell>
                                <CustomTableCell>{state.data.camera || '-'}</CustomTableCell>
                                <CustomTableCell>{state.data.time || '-'}</CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* 선택한 항목이 있을 때 그 내용 출력 */}
                {selectedItem &&
                    <Card sx={{ marginTop: '15px' }}>
                        <CardContent>
                          {selectedItem.message.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </CardContent>
                    </Card>
                }
            </div>
        </Container>
    );
}

export default VideoContentArea;
