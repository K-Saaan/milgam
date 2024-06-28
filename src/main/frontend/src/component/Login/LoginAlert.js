import * as React from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

/*
  * 1. FileName : LoginAlert
  * 2. Comment   : 로그인 5회 실패 시 출력하는 경고 창
  * 3. 작성자    : boreum
  * 4. 작성일    : 2024. 06. 27
*/

const LoginAlert = ({ alertOpen, handleClose }) => {
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
            <DialogTitle
                id="alert-dialog-title"
                style={{
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    margin: "5px",
                    fontSize: "15px"
                }}
            >
                {"알림"}
                <DialogActions
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <IconButton onClick={handleClose} style={{color: "white"}}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </DialogTitle>
            <Divider style={{background: "#9797973D", marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "30px",}}>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{color: "#FFFFFF", textAlign: "center", fontSize: "14px"}}
                >
                    로그인 시도 5회 이상 실패하여
                </DialogContentText>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{color: "#FFFFFF", textAlign: "center", marginBottom: "10px", fontSize: "14px"}}
                >
                    접근이 제한되었습니다.
                </DialogContentText>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{color: "#979797", textAlign: "center", fontSize: "12px"}}
                >
                    가입 이메일로 임시 비밀번호를 발송하였습니다.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default LoginAlert;