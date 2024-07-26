import Button from '@mui/material/Button';
import { styled } from '@mui/system';

/**
 * 1. ClassName: LongButton
 * 2. FileName : LongButton.js
 * 3. Package  : components.Styles
 * 4. Comment  : 버튼 스타일 지정
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 06. 27
 **/
const LongButton = styled(Button)(({ theme }) =>({
    marginTop: "20px",
    width: "280px",
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.text,
}));

export default LongButton;
