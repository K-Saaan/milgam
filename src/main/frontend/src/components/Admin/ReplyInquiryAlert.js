import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Typography, DialogTitle, Button, TextField, Box} from '@mui/material';

const ReplyInquiryAlert = ({ open, handleClose, question, onSubmit }) => {
    // 답변 내용을 저장하는 상태 변수
    const [answer, setAnswer] = useState('');

    // 모달이 열리거나 질문이 변경될 때 답변 내용을 초기화하는 효과
    useEffect(() => {
        if (open && question) {
            setAnswer('');
        }
    }, [open, question]);

    // 제출 버튼 클릭 시 호출되는 함수
    const handleSubmit = () => {
        onSubmit(answer);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{question?.question_title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>문의 내용: {question?.question}</Typography>
                <Typography variant="body1" gutterBottom>문의 날짜: {question?.question_date}</Typography>
                <Typography variant="body1" gutterBottom>작성자: {question?.name}</Typography>
                <Box mt={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="답변 내용을 입력하세요"
                        type="text"
                        fullWidth
                        variant="outlined"
                        rows={8}
                        multiline
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">취소</Button>
                <Button onClick={handleSubmit} color="primary">제출</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReplyInquiryAlert;
