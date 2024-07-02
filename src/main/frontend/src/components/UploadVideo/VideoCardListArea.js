import React from "react";

import { Box, Typography, List, ListItem, Divider, useTheme } from '@mui/material';
import CustomChip from "./CustomChip.js";
import CustomListItem from "./CustomListItem.js";
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';


const VideoCardListArea = ({ alerts }) => {
    const theme = useTheme();

    return (
        <div>
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
                    <CustomListItem key={alert.id} button>
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
        </div>
    );
}

export default VideoCardListArea;