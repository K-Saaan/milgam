import * as React from 'react';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// 타이틀 스타일 정의
const cTitleStyle = (theme) => ({
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "5px",
    fontSize: "15px"
});
// 내용 정렬
const actionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
// 버튼 스타일 정의
const btnStyle = {
    width: "40%",
    marginTop: "20px",
}
// 글씨 스타일 정의
const cTextStyle = (theme) => ({
    color: theme.palette.text.primary,
    textAlign: "center",
    fontSize: "14px"
});

// 로그인 안된 상태에서 메뉴 클릭시 뜨는 알림
const LoginAlert = ({ alertOpen, handleClose }) => {
    const theme = useTheme();
    const titleStyle = cTitleStyle(theme);
    const textStyle = cTextStyle(theme);
    const navigate = useNavigate(); 

    const handleLoginRedirect = () => {
        navigate('/login/loginPage'); 
        handleClose()
      };

    return (
        <Dialog
            open={alertOpen}
            onClose={handleClose}
            PaperProps={{
                style: {background: theme.palette.background.default, width: "350px",}
            }}
        >
            <DialogTitle id="alert-dialog-title" style={titleStyle}>
                알림
            </DialogTitle>
            <Divider style={{background: theme.palette.divider, marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "10px",}}>
                <DialogContentText id="alert-dialog-slide-description" style={textStyle} >
                    로그인 하시겠습니까?
                </DialogContentText>
                 <DialogActions style={actionStyle}>
                    <Button variant="contained" onClick={handleLoginRedirect} style={btnStyle}>
                        예
                    </Button>
                    <Button variant="contained" onClick={handleClose}
                        sx={{...btnStyle, backgroundColor: theme.palette.cancel, '&:hover': { backgroundColor: 'inherit' } }}
                    >아니요</Button>

                    
                 </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default LoginAlert;