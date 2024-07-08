import React from 'react';
import { Outlet } from "react-router-dom";
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../Theme';

const MainBox = styled(Box)(({ theme }) => ({
  width: '95%',
  minHeight: '100vh',
  bgcolor: theme.palette.background.default,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledContainer = styled(Container)(({ theme, noBg }) => ({
  width: '90%',
  backgroundColor: noBg ? 'transparent' : theme.palette.secondary.main,
  borderRadius: '12px',
  padding: '16px',
  marginTop: '10px',
  marginBottom: '50px',
}));

function Background() {
  return (
      <MainBox>
        <StyledContainer noBg={false}>
          <Outlet/>
        </StyledContainer>
      </MainBox>
  );
}

export default Background;
