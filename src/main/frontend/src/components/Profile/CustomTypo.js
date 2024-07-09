import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CustomTypographyWrapper = styled('div')(({ theme }) => ({
    width: '370px',
    height: '56px',
    backgroundColor: theme.palette.secondary.main,
    opacity: 1, // 불투명도
    borderRadius: '4px', // 둥근 모서리 추가
    padding: '16.5px 14px', // 내부 패딩 추가
    border: `1px solid ${theme.palette.border.primary}`, // 기본 테두리 색상 및 두께 설정
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    // fontFamily: "Nunito Sans",
    color: theme.palette.text.secondary,
    fontSize: '16px',
}));

export { CustomTypographyWrapper, CustomTypography };