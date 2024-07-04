import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// const Background = (props) => {

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         flex: 1,
//         overflow: 'auto',
//       }}
//     >
//     <Container
//         sx={{
//             backgroundColor: 'transparent'
//         }}>
//         {props.name}
//     </Container>
//     <Container
//         maxwidth={false}
//         sx={{
//             width: 'calc(100% - 40px)', // 좌우 여백을 20px씩 두고 너비 설정
//             height: '80vh', // 상하 크기를 뷰포트 높이의 80%로 설정
//             dispay: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 2,
//             marginTop: '20px', // 상단 여백
//             marginBottom: '10px', // 하단 여백
//             marginLeft: '10px', // 좌측 여백
//             marginRight: '10px', // 우측 여백
            
//         }}  
//     >
//         {props.contents}
//     </Container>
//     </Box>
    
//   )
// }

// export default Background

const Background = (props) => {
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
            mb: 0,
        }}
            //   sx={{
            //     width: 'calc(100% - 40px)', // 좌우 여백을 20px씩 두고 너비 설정
            //       height: '80vh', // 상하 크기를 뷰포트 높이의 80%로 설정
            //       dispay: 'flex',
            //       alignItems: 'center',
            //       justifyContent: 'center',
            //       padding: 2,
            //       marginTop: '20px', // 상단 여백
            //       marginBottom: '10px', // 하단 여백
            //       marginLeft: '10px', // 좌측 여백
            //       marginRight: '10px', // 우측 여백
            // alignItems: 'stretch',
                
            //   }}  
      >
        {props.contents}
      </Container>
    </Box>
  )
}
  
  export default Background