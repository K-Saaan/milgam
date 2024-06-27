import React from 'react';
import { Box, Typography } from '@mui/material';


function Login({ onSignupClick }) {
  return (
    <Box>
      <Typography variant="h6">로그인</Typography>
      <button onClick={onSignupClick}>회원가입</button>
    </Box>
  );
}

export default Login;
