import * as React from 'react';

import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const btnStyle = {
    width: "40%",
    marginTop: "20px",
}

const textStyle = {color: "#FFFFFF", textAlign: "center", fontSize: "14px"}

const Logout = ({ alertOpen, handleClose }) => {
    return (
        <Dialog
            open={alertOpen}
            onClose={handleClose}
            PaperProps={{
                style: {background: '#273142', width: "350px",}
            }}
        >
            <DialogTitle id="alert-dialog-title" style={titleStyle}>
                {"로그아웃"}
            </DialogTitle>
            <Divider style={{background: "#9797973D", marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginBottom: "10px",}}>
                <DialogContentText id="alert-dialog-slide-description" style={textStyle} >
                    로그아웃 하시겠습니까?
                    <DialogActions style={actionStyle}>
                        <Button variant="contained" onClick={handleClose} style={btnStyle}>
                            취소
                        </Button>
                        <Button variant="contained" onClick={handleClose} style={btnStyle}>
                            로그아웃
                        </Button>
                    </DialogActions>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default Logout;