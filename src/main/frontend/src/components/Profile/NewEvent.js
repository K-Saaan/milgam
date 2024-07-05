import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewEvent = ({ open, onClose, onAddEvent }) => {
    const [newEvent, setNewEvent] = useState('');

    const handleInputChange = (event) => {
        setNewEvent(event.target.value);
    };

    const handleAddEvent = () => {
        onAddEvent(newEvent);
        setNewEvent('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>새 이벤트 추가</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    새 이벤트의 이름을 입력하고 확인을 눌러 추가하세요.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-event"
                    label="새 이벤트"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newEvent}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleAddEvent} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewEvent;
