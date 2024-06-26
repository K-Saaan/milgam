import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';


const Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setIsOpen(open);
    };

    const drawerList = () => (
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ width: 250 }}
      >
        <List>
          {['Home', 'About', 'Contact'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : index === 1 ? <InfoIcon /> : <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <Box sx={{
        width: '100%',
        minHeight: '100vh', // 뷰포트의 최소 높이를 100%로 설정
        bgcolor: '#273142' // 배경색 설정
      }}>
        <Box sx={{
          width: '100%',
          height: 50,
          bgcolor: '#456990', // 헤더의 배경색
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white', marginRight: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My Header</Typography>
        </Box>
        <Drawer
          anchor='left'
          open={isOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList()}
        </Drawer>
        {/* 여기에 추가적인 컨텐츠를 배치할 수 있습니다. */}
      </Box>
    );
}

export default Main;


