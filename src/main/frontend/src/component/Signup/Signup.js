import React from 'react';
import { Box, Typography } from '@mui/material';

function Signup({ onLoginClick }) {
  return (
    <Box>
      <Typography variant="h6">회원가입</Typography>
      <button onClick={onLoginClick}>로그인</button>
    </Box>
  );
}

export default Signup;
