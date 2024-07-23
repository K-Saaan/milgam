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
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
});

// 제목 텍스트 스타일
const titleTextStyle = (theme, selected) => ({
    color: selected ? 'white' : theme.palette.primary.main,
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

// 시간 포맷팅
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const VideoCardListArea = ({ onSelect, selectedItem}) => {
    const theme = useTheme();
    const { state } = useLocation();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (state?.response) {
            const sortedAlerts = state.response.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            const alertsWithId = sortedAlerts.map((alert, index) => ({ ...alert, id: index + 1 }));
            setAlerts(alertsWithId);
        }
    }, [state]);

    return (
        <Container sx={paperStyle(theme)}>
            <Box sx={headerStyle(theme)}>
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1rem' }}>
                    위험 알림
                </Typography>
            </Box>
            {/* 분석 결과 목록 */}
            <List sx={listStyle}>
                {/* 알림 있을 때만 띄움 */}
                {alerts.length > 0 ? alerts.map(alert => (
                    //선택 항목 정보를 부모로 전달함
                    <CustomListItem key={alert.id} onClick={() => onSelect(alert)} selected={selectedItem?.id === alert.id} button>
                        <Typography variant="body2" sx={timeTextStyle(theme, isSelected)}>
                            {formatTimestamp(alert.timestamp)}
                        </Typography>
                        <Box sx={titleBoxStyle}>
                            <MailIcon sx={{ color: selectedItem?.id === alert.id ? 'white' : theme.palette.primary.main, marginRight: 1 }} />
                            <Typography variant="body2" sx={titleTextStyle(theme, selectedItem?.id === alert.id)}>
                                {alert.event}
                            </Typography>
                        </Box>
                    </CustomListItem>
                )) : (
                    <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
                        No alerts available
                    </Typography>
                )}
            </List>
        </Container>
    );
}

export default VideoCardListArea;