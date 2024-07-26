import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CustomTypographyWrapper = styled('div')(({ theme }) => ({
    width: '75%',
    height: '56px',
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    borderRadius: '4px',
    padding: '16.5px 14px',
    border: `1px solid ${theme.palette.border.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '16px',
}));

export { CustomTypographyWrapper, CustomTypography };