import React from "react";
import SignUpForm from "../components/SignUp/SignUpForm.js";


const SignUp = () => {
    return (
        <SignUpForm/>
    );
}
export default SignUp;


// import Background from "../components/Background";
// import { TextField, Button, Box } from '@mui/material';

// function SignUp(){
//     return (
//           <Background
//             name="회원가입"
//             contents={
//                 <Box
//                     sx={{
//                         width: '100%', // 폼의 너비를 컨테이너 크기에 맞춤
//                         maxWidth: 500, // 최대 너비 제한
//                         p: 2, // 패딩
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 2, // 요소 간 간격
//                     }}
//                 >
//                     <TextField
//                         label="이메일"
//                         variant="outlined"
//                         type="email"
//                         fullWidth
//                     />
//                     <TextField
//                         label="비밀번호"
//                         variant="outlined"
//                         type="password"
//                         fullWidth
//                     />
//                     <TextField
//                         label="비밀번호 확인"
//                         variant="outlined"
//                         type="password"
//                         fullWidth
//                     />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                     >
//                         회원가입
//                     </Button>
//                 </Box>
//             }
//             />
//       );
// }

// export default SignUp;