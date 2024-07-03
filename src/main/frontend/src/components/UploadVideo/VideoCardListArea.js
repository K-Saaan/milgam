import React from "react";

import { Box, Typography, List, Divider, useTheme, Paper } from '@mui/material';
import CustomChip from "./CustomChip.js";
import CustomListItem from "../Styles/CustomListItem.js";
import MailIcon from '@mui/icons-material/Mail';

const paperStyle = (theme) => ({
  flex: 3,
  height: '100%',
  padding: 2,
  bgcolor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  borderRadius: 2,
  margin: 2,
});

const VideoCardListArea = ({ alerts, onSelect }) => {
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
                    <CustomListItem key={alert.id} onClick={() => onSelect(alert)} button>
                      <Typography variant="body2" sx={{ color: theme.palette.primary.main, marginBottom: 1 }}>
                        {alert.time}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MailIcon sx={{ color: theme.palette.primary.main, marginRight: 1 }} />
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
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