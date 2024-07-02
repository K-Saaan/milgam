import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function RegisterAlert({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: "12px" },
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>문의</DialogTitle>
      <DialogContent>
        <DialogContentText>
            제목
        </DialogContentText>
        <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        name="title"
        label="문의 제목"
        type="text"
        fullWidth
        variant="standard"
        />
        <DialogContentText>
            내용
        </DialogContentText>
        <TextField
        autoFocus
        required
        margin="dense"
        id="content"
        name="content"
        label="문의 내용"
        type="text"
        fullWidth
        variant="standard"
        />  
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button type="submit">등록</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterAlert;
