import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

import DirectorSignUp from "./DirectorSignUp.js";
import HostSignUp from "./HostSignUp.js";
import LongButton from "../Styles/LongButton.js";
import NextButton from "./NextButton.js";
import CustomTextField from '../Styles/CustomTextField.js';

import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

// const SignUpForm = ({ marginBottom }) => {
//     const navigate = useNavigate();
//     const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
//     const [alertOpen, setOpen] = React.useState(false);
//     const userType = watch('userType'); // 폼 필드 값 관찰
//     const [redirectPath, setRedirectPath] = useState(null); // 리다이렉션 경로 상태

//     const formSx = { // 폼 스타일
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: '50px',
//     };
    
//     // const onSignupClick = () => {
//     //     navigate('/signup');
//     // };

//     const handleClickOpen = () => { // 알림창 열림 함수
//         setOpen(true);
//     };
//     const handleClose = () => { // 알림창 닫힘 함수
//         setOpen(false);
//     };
    
//     const onSubmit = (data) => {
//         console.log(data);
    
//         // 선택된 사용자 유형에 따라 페이지 리다이렉트
//         if (data.userType === 'director') {
//           setRedirectPath('/directorsignup');
//         } else if (data.userType === 'host') {
//           setRedirectPath('/hostsignup');
//         }
//       };

//     return (
//         <Box
//             component="form"
//             sx={{ flexGrow: 1 }}
//         >
//             <Grid container spacing={3}>
//                 {/* <Grid item xs={6}>
//                     <CustomTextField
//                         label="이름"
//                         id="name"
//                         {...register("name", { required: "이름을 입력해주세요." })}
//                         inputProps={{ maxLength: 30 }}
//                         error={!!errors.name}
//                         helperText={errors.name?.message}
//                         style={{ marginBottom: errors.name ? '0px' : '23px' }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <CustomTextField
//                         label="아이디"
//                         id="id"
//                         {...register("id", {
//                             required: "아이디를 입력해주세요.",
//                             pattern: {
//                                 value: /^[A-Za-z0-9]+$/,
//                                 message: "영어와 숫자만 입력 가능합니다.",
//                             },
//                             minLength: {
//                                 value: 5,
//                                 message: "아이디는 5글자 이상이어야 합니다.",
//                             },
//                             maxLength: {
//                                 value: 30,
//                                 message: "아이디는 30글자 이하이어야 합니다.",
//                             },
//                         })}
//                         // inputProps={{ maxLength: 30 }}
//                         error={!!errors.id}
//                         helperText={errors.id?.message}
//                         style={{ marginBottom: errors.id ? '0px' : '23px' }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <CustomTextField
//                         label="이메일"
//                         id="email"
//                         {...register("email", { required: "이메일을 입력해주세요." })}
//                         inputProps={{ maxLength: 30 }}
//                         error={!!errors.email}
//                         helperText={errors.email?.message}
//                         style={{ marginBottom: errors.email ? '0px' : '23px' }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <CustomTextField
//                         label="비밀번호"
//                         id="pw"
//                         {...register("pw", { required: "비밀번호를 입력해주세요." })}
//                         inputProps={{ maxLength: 30 }}
//                         error={!!errors.pw}
//                         helperText={errors.pw?.message}
//                         style={{ marginBottom: errors.pw ? '0px' : '23px' }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <CustomTextField
//                         label="비밀번호 재확인"
//                         id="pw"
//                         {...register("pw", { required: "비밀번호를 다시 입력해주세요." })}
//                         inputProps={{ maxLength: 30 }}
//                         error={!!errors.pw}
//                         helperText={errors.pw?.message}
//                         style={{ marginBottom: errors.pw ? '0px' : '23px' }}
//                     />
//                 </Grid>
//                 <Grid item xs={6}>
//                     <CustomTextField
//                         label="전화번호"
//                         id="phone"
//                         {...register("phone", { required: "전화번호를 입력해주세요." })}
//                         inputProps={{ maxLength: 30 }}
//                         error={!!errors.phone}
//                         helperText={errors.phone?.message}
//                         style={{ marginBottom: errors.phone ? '0px' : '23px' }}
//                     />
//                 </Grid> */}
//                 <Grid item xs={6}>
//                     <FormControl fullWidth>
//                         <InputLabel id="usertype">구분</InputLabel>
//                         <Select
//                         labelId="usertype"
//                         id="userType"
//                         value={userType || ''}
//                         label="구분"
//                         onChange={(e) => setValue('userType', e.target.value)}
//                         {...register("userType", { required: "사용자 유형을 선택해주세요." })}
//                         error={!!errors.userType}
//                         >
//                         <MenuItem value="host">행사관리자</MenuItem>
//                         <MenuItem value="director">관공서</MenuItem>
//                         </Select>
//                         {errors.userType && <p style={{ color: 'red', marginBottom: 0 }}>{errors.userType.message}</p>}
//                     </FormControl>
//                 </Grid>
//                 <div>
//                     <LongButton component={Link} to={redirectPath} variant="contained">다음</LongButton>
//                 </div>
//             </Grid>
//         </Box>
//     );
// };

// export default SignUpForm;

import Background from "../Background";
import { TextField, Button } from '@mui/material';

function SignUp(){
    return (
          <Background
            name="회원가입"
            contents={
                <Box
                    sx={{
                        width: '100%', // 폼의 너비를 컨테이너 크기에 맞춤
                        maxWidth: 500, // 최대 너비 제한
                        p: 2, // 패딩
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 요소 간 간격
                    }}
                >
                    <TextField
                        label="이메일"
                        variant="outlined"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        label="비밀번호"
                        variant="outlined"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        label="비밀번호 확인"
                        variant="outlined"
                        type="password"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        회원가입
                    </Button>
                </Box>
            }
            />
      );
}

export default SignUp;