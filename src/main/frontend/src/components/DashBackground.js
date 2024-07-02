import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const DashBackground = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
        mb:0,
      }}
    >
      <Container
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid black',
          mb: 0,
        }}
      >
        {props.name}
      </Container>
      <Container
        sx={{
            height: '75vh',
            backgroundColor: 'transparent',
            border: '1px solid black',
            mb: 0,
        }}
      >
        {props.contents}
      </Container>
    </Box>
  )
}
  
  export default DashBackground