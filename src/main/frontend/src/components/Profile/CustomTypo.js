import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CustomTypographyWrapper = styled('div')(({ theme }) => ({
    width: '370px',
    height: '56px',
    backgroundColor: '#323D4E',
    opacity: 1, // 불투명도
    borderRadius: '4px', // 둥근 모서리 추가
    padding: '16.5px 14px', // 내부 패딩 추가
    border: '1px solid #CFCFCF1D', // 기본 테두리 색상 및 두께 설정
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    // fontFamily: "Nunito Sans",
    color: '#B6B6B6',
    fontSize: '16px',
}));

export { CustomTypographyWrapper, CustomTypography };