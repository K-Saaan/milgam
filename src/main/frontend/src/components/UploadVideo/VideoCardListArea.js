import React, { useEffect, useState } from "react";

import { Box, Typography, List, useTheme, Container } from '@mui/material';
import CustomListItem from "../Styles/CustomListItem.js";
import MailIcon from '@mui/icons-material/Mail';
import {useLocation} from "react-router-dom";

// 배경 스타일
const paperStyle = (theme) => ({
    padding: 2,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: 2,
    marginLeft: 2,
    minHeight: '65vh',
});

// 헤더 스타일
const headerStyle = (theme) => ({
    bgcolor: theme.palette.primary.main,
    padding: 1,
    borderRadius: 1,
    textAlign: 'center',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
});

// 제목 박스 스타일
const titleBoxStyle = {
    display: 'flex',
    alignItems: 'center',
};

// 시간 텍스트의 스타일
const timeTextStyle = (theme, selected) => ({
    color: selected ? theme.palette.text.primary : theme.palette.primary.main,
    marginBottom: 1,
    fontSize: '18px',
    fontWeight: 400,
});

// 제목 텍스트 스타일
const titleTextStyle = (theme, selected) => ({
    fontSize: '20px',
    fontWeight: 500,
    color: selected ? theme.palette.text.primary : theme.palette.primary.main,
});

const noScrollbarStyles = {
    '&::-webkit-scrollbar': {
        display: 'none', // Chrome, Safari, and Opera
    },
    '-ms-overflow-style': 'none',  // Internet Explorer 10+
    'scrollbar-width': 'none'  // Firefox
};

// 알림 리스트의 스타일
const listStyle = {
    height: 'calc(100% - 100px)',
    overflow: 'auto',
    ...noScrollbarStyles
};

/**
 * 1. ClassName: VideoCardListArea
 * 2. FileName : VideoCardListArea.js
 * 3. Package  : components.UploadVideo
 * 4. Comment  : 영상 분석 결과 리스트 출력 화면
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 07. 02
 **/
const VideoCardListArea = ({ onSelect, selectedItem}) => {
    const theme = useTheme();
    const { state } = useLocation();
    const [alerts, setAlerts] = useState([]);

    //받아 온 영상 분석 결과를 추출하는 부분
    useEffect(() => {
        if (state?.response) {
            const alertsWithId = state.response.map((alertString, index) => {
                // 정규식 사용하여 각 부분을 추출
                const regex = /^\[(.*?),\s(.*?),\s([\s\S]*?)\]$/;
                const match = alertString.match(regex);
                //문자열을 각 필드로 나누어 저장
                if (match) {
                    return {
                        id: index + 1,
                        timestamp: match[1],
                        event: match[2],
                        message: match[3]
                    };
                }
                return null;
            }).filter(alert => alert !== null);

            setAlerts(alertsWithId);
        }
    }, [state]);

    return (
        <Container sx={paperStyle(theme)}>
            <Box sx={headerStyle(theme)}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1.3rem' }}>
                    위험 알림
                </Typography>
            </Box>
            {/* 분석 결과 목록 */}
            <List sx={listStyle}>
                {/* 알림 있을 때만 띄움 */}
                {alerts.length > 0 ? alerts.map((alert) => (
                    //선택 항목 정보를 부모로 전달함
                    <CustomListItem key={alert.id}
                        onClick={() => onSelect(alert)}
                        selected={selectedItem?.id === alert.id }
                        style={{ padding: '15px', marginBottom: '15px' }}
                    button>
                        <Typography variant="body2" sx={timeTextStyle(theme, selectedItem?.id === alert.id)}>
                            {alert.timestamp + " seconds"}
                        </Typography>
                        <Box sx={titleBoxStyle}>
                            <MailIcon sx={{ color: selectedItem?.id === alert.id ? theme.palette.text.primary : theme.palette.primary.main, marginRight: 1 }} />
                            <Typography variant="body2" sx={titleTextStyle(theme, selectedItem?.id === alert.id)}>
                                {alert.event}
                            </Typography>
                        </Box>
                    </CustomListItem>
                )) : (
                    //알림 없을 때
                    <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
                        No alerts available
                    </Typography>
                )}
            </List>
        </Container>
    );
}

export default VideoCardListArea;