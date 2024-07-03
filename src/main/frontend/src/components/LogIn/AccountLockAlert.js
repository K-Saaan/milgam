import * as React from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


const titleStyle = {
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "5px",
    fontSize: "15px"
}

const actionStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
}

const textStyle = {color: "#FFFFFF", textAlign: "center", fontSize: "14px"}

const AccountLockAlert = ({ alertOpen, handleClose }) => {
    return (
        <Dialog
            open={alertOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

            PaperProps={{
                style: {
                    background: '#273142',
                    width: "350px",
                }
            }}
        >
            <DialogTitle id="alert-dialog-title" style={titleStyle}>
                {"알림"}
                <DialogActions style={actionStyle}>
                    <IconButton onClick={handleClose} style={{color: "white"}}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </DialogTitle>
            <Divider style={{background: "#9797973D", marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "30px",}}>
                <DialogContentText id="alert-dialog-slide-description" style={textStyle} >
                    로그인 시도 5회 이상 실패하여
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description" sx={textStyle} >
                    접근이 제한되었습니다.
                </DialogContentText>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{color: "#979797", textAlign: "center", fontSize: "12px", marginTop: "10px"}}
                >
                    가입 이메일로 임시 비밀번호를 발송하였습니다.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default AccountLockAlert;