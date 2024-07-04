import React from "react";

import { Box, Typography, List, Divider, useTheme, Paper } from '@mui/material';
import CustomChip from "./CustomChip.js";
import CustomListItem from "../Styles/CustomListItem.js";
import MailIcon from '@mui/icons-material/Mail';

const paperStyle = (theme) => ({
  flex: 3,
  height: '100%',
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
  marginLeft: 2,
  minHeight: '75vh',
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

const VideoCardListArea = ({ alerts, onSelect, selectedItem }) => {
    const theme = useTheme();

    return (
        <Paper sx={paperStyle(theme)}>
            <div style={{display: 'flex' ,justifyContent: 'space-between', marginBottom:"20px", marginTop:"10px"}}>
                <CustomChip label="위험" sx={{backgroundColor:"#EF3826"}}/>
                <CustomChip label="혼잡" sx={{backgroundColor:"#FFA756"}}/>
                <CustomChip label="주의" sx={{backgroundColor:"#E9C157"}}/>
                <CustomChip label="원활" sx={{backgroundColor:"#00B69B"}}/>
            </div>
            <div>이벤트 발생 로그</div>
               <Divider style={{background: "#9797973D", marginTop:"5px",marginBottom:"20px"}}/>
            <div>
                <List sx={{ height: 'calc(100% - 52px)', overflow: 'auto' }}>
                  {alerts.map(alert => (
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
                </List>
            </div>
        </Paper>
    );
}

export default VideoCardListArea;