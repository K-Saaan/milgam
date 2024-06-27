// import React, { useState } from 'react';
// import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Tabs, Tab } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import PropTypes from 'prop-types';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// const Test_mj = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [value, setValue] = useState(0);

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setIsOpen(open);
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const drawerList = () => (
//     <Box
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//       sx={{ width: 250 }}
//     >
//       <List>
//         {['Home', 'About', 'Contact'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index === 0 ? <HomeIcon /> : <InfoIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{
//       width: '100%',
//       minHeight: '100vh', // 뷰포트의 최소 높이를 100%로 설정
//       bgcolor: '#273142' // 배경색 설정
//     }}>
//       <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
//         <Tabs
//           orientation="vertical"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           aria-label="Vertical tabs example"
//           sx={{ borderRight: 1, borderColor: 'divider' }}
//         >
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//           <Tab label="Item Four" {...a11yProps(3)} />
//           <Tab label="Item Five" {...a11yProps(4)} />
//           <Tab label="Item Six" {...a11yProps(5)} />
//           <Tab label="Item Seven" {...a11yProps(6)} />
//         </Tabs>
//         <TabPanel value={value} index={0}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           Item Three
//         </TabPanel>
//         <TabPanel value={value} index={3}>
//           Item Four
//         </TabPanel>
//         <TabPanel value={value} index={4}>
//           Item Five
//         </TabPanel>
//         <TabPanel value={value} index={5}>
//           Item Six
//         </TabPanel>
//         <TabPanel value={value} index={6}>
//           Item Seven
//         </TabPanel>
//       </Box>
//     </Box>
//   );
// }

// export default Test_mj;
