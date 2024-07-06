import * as React from 'react';

import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';


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


// 로그아웃: 사이드바에서 alertOpen 가 true 되면 열림.
const Logout = ({ alertOpen, handleClose, handleLogout }) => {
    const theme = useTheme();
    const titleStyle = cTitleStyle(theme);
    const textStyle = cTextStyle(theme);

    return (
        <Dialog
            open={alertOpen}
            onClose={handleClose}
            PaperProps={{
                style: {background: theme.palette.background.default, width: "350px",}
            }}
        >
            <DialogTitle id="alert-dialog-title" style={titleStyle}>
                로그아웃
            </DialogTitle>
            <Divider style={{background: theme.palette.divider, marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "10px",}}>
                <DialogContentText id="alert-dialog-slide-description" style={textStyle} >
                    로그아웃 하시겠습니까?
                </DialogContentText>
                 <DialogActions style={actionStyle}>
                    {/* 부모에 있는 함수 실행 */}
                    <Button variant="contained" onClick={handleClose} style={btnStyle}>
                        취소
                    </Button>
                    {/* 부모에 있는 함수 실행 */}
                    <Button variant="contained" onClick={handleLogout} style={btnStyle}>
                        로그아웃
                    </Button>
                 </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default Logout;