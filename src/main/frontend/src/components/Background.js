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
        flex: 0.7,
        marginTop:'3%',
      }}
    >
      {/* 헤더 부분 */}
      <Container
        sx={{
            backgroundColor: 'transparent',
            margin: 0, maxWidth: '1152px',
            paddingTop: "16px", paddingBottom: "10px"}}>
        <h1 style={{margin: "0px"}}>{props.name}</h1>
      </Container>
      {/* 내용 부분 */}
      <Container
        maxWidth={false}
        sx={{width: '100%', maxWidth: '1152px', minHeight: '600px', boxShadow: 1}}>
        {props.contents}
      </Container>
    </Box>
  )
}
  
  export default Background