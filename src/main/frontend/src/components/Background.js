import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const Background = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        padding: "16px",
      }}
    >
      {/* 헤더 부분 */}
      <Container sx={{backgroundColor: 'transparent', margin: 0, padding: "32px", paddingTop: "16px"}}>
        <h1 style={{margin: "0px"}}>{props.name}</h1>
      </Container>
      {/* 내용 부분 */}
      <Container sx={{minHeight: '75vh',}}>
        {props.contents}
      </Container>
    </Box>
  )
}
  
  export default Background