import React from "react";

import { Box, Typography, List, Divider, useTheme, Container } from '@mui/material';
import CustomChip from "./CustomChip.js";
import CustomListItem from "../Styles/CustomListItem.js";
import MailIcon from '@mui/icons-material/Mail';
import CircularProgress from '@mui/material/CircularProgress';

// 배경 스타일
const paperStyle = (theme) => ({
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
  marginLeft: 2,
  minHeight: '65vh',
});

// 시간 텍스트의 스타일
const timeTextStyle = (theme, selected) => ({
  color: selected ? 'white' : theme.palette.primary.main,
  marginBottom: 1,
});

// 제목 박스 스타일
const titleBoxStyle = {
  display: 'flex',
  alignItems: 'center',
};

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

const listStyle = {
  height: 'calc(100% - 100px)',
  overflow: 'auto',
  ...noScrollbarStyles
};

const progressStyle = {
  margin: "20px",
  justifyContent: "center",
  display: 'flex',
};

const VideoCardListArea = ({ alerts, onSelect, selectedItem, isLoading, error }) => {
    const theme = useTheme();

    return (
        <Container sx={paperStyle(theme)}>
            {/* 상단 칩(버튼 작동 안함) */}
            <div style={{display: 'flex' ,justifyContent: 'space-between', marginBottom:"20px", marginTop:"10px"}}>
                <CustomChip label="위험" sx={{backgroundColor:"#EF3826"}}/>
                <CustomChip label="혼잡" sx={{backgroundColor:"#FFA756"}}/>
                <CustomChip label="주의" sx={{backgroundColor:"#E9C157"}}/>
                <CustomChip label="원활" sx={{backgroundColor:"#00B69B"}}/>
            </div>
            <div>이벤트 발생 로그</div>
            <Divider style={{background: theme.palette.divider, marginTop:"5px",marginBottom:"20px"}}/>
            {/* 분석 결과 목록 */}
            <List sx={listStyle}>
                {/* 알림 있을 때만 띄움 */}
                {alerts && alerts.map(alert => (
                    //선택 항목 정보를 부모로 전달함
                    <CustomListItem key={alert.id} onClick={() => onSelect(alert)} selected={selectedItem?.id === alert.id} button>
                        <Typography variant="body2" sx={timeTextStyle(theme, selectedItem?.id === alert.id)}>
                            {alert.time}
                        </Typography>
                        <Box sx={titleBoxStyle}>
                            <MailIcon sx={{ color: selectedItem?.id === alert.id ? 'white' : theme.palette.primary.main, marginRight: 1 }} />
                            <Typography variant="body2" sx={titleTextStyle(theme, selectedItem?.id === alert.id)}>
                                {alert.title}
                            </Typography>
                        </Box>
                    </CustomListItem>
                ))}

                {/* 로딩 중일 때 표시 */}
                {isLoading &&
                    <div style={progressStyle}>
                        <CircularProgress sx={{color:theme.palette.primary.main}} />
                    </div>
                }

                {/* 로딩도 끝났고 알림도 없을 때 */}
                {!isLoading && !alerts &&
                    <CustomListItem>
                        {error}이벤트가 없습니다.
                    </CustomListItem>
                }
            </List>
        </Container>
    );
}

export default VideoCardListArea;