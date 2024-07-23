import React, { useRef } from "react";
import { useLocation } from 'react-router-dom';
import VideoCard from "./VideoCard.js";

import { useTheme } from '@mui/material/styles';
import { Container, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
import { CustomTableCell, tableHeaderStyle } from '../Styles/CustomTable'

// 배경 스타일
const paperStyle = (theme) => ({
    padding: 16, // Updated to a more common padding value
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: 8, // Updated for consistency with common MUI values
    marginRight: 16,
    minHeight: '65vh',
});

const contStyle = (theme) => ({
    margin: '20px',
});

// 영상 분석 결과 좌측 영역
const VideoContentArea = ({ selectedItem }) => {
    const theme = useTheme();
    const { state } = useLocation();
    const playerRef = useRef(null);

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
                            {selectedItem.message}
                        </CardContent>
                    </Card>
                }
            </div>
        </Container>
    );
}

export default VideoContentArea;
