import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
  }
`;

/**
 * 1. ClassName: DashBackground
 * 2. FileName : DashBackground.js
 * 3. Package  : components.DashBackground
 * 4. Comment  : 대시보드의 Background 디자인 설정
 * 5. 작성자   : seungwon
 * 6. 작성일    : 2024. 07. 16
 **/
const DashBackground = (props) => {
  return (
    <>
      <GlobalStyle />
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
              padding: "32px", paddingTop: "16px", paddingBottom: "10px"}}>
          <h1 style={{margin: "0px" }}>{props.name}</h1>
        </Container>
        {/* 내용 부분 */}
        <Container
          style={{
              backgroundColor: 'transparent',
              minHeight: '65vh',
              maxWidth: '1200px',
          }}
        >
          {props.contents}
        </Container>
      </Box>
    </>
  )
}
  
  export default DashBackground