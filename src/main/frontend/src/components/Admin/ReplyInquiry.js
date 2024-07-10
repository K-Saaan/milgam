import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, TablePagination } from '@mui/material';
import ReplyInquiryAlert from './ReplyInquiryAlert';

// 행 스타일
const CustomTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const ReplyInquiry = () => {
    // 임시 데이터 설정
    const initialQuestions = [
        {
        id: 1,
        question_title: "메이크업 관련 문의",
        question: "어떤 제품을 사용하나요?",
        question_date: "2024-06-25",
        name: "이민정",
        answer_date: null,
        },
        {
        id: 2,
        question_title: "Asus Laptop 관련 문의",
        question: "노트북 배터리 교체 가능한가요?",
        question_date: "2024-06-20",
        name: "김철수",
        answer_date: "2024-06-21",
        },
        {
        id: 3,
        question_title: "Iphone X 관련 문의",
        question: "액정 수리 비용이 얼마인가요?",
        question_date: "2024-06-15",
        name: "박영희",
        answer_date: null,
        },
    ];

    // 상태관리 변수들
    const [questions, setQuestions] = useState(initialQuestions);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 페이지네이션
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // 처음 렌더링될 때 실행
    useEffect(() => {
        axios.get('/api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('질문을 가져오는 중 오류가 발생했습니다!', error);
            });
    }, []);

    // 모달 여는 함수
    const openModal = (question) => {
        setSelectedQuestion(question);
        setIsModalOpen(true);
    };

    // 모달 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuestion(null);
    };

    // 답변 제출 처리 함수
    const handleAnswerSubmit = (answer) => {
        const answerData = {
            answer,
            answer_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
            end_date: new Date().toISOString().split('T')[0]
        };

        axios.post(`/api/questions/${selectedQuestion.id}/answer`, answerData)
            .then(response => {
                closeModal();
                // 질문 목록을 업데이트하여 답변 상태 반영
                setQuestions(prevQuestions => 
                    prevQuestions.map(q => 
                        q.id === selectedQuestion.id ? { ...q, ...answerData, status: '완료' } : q
                    )
                );
            })
            .catch(error => {
                console.error('답변 제출 중 오류가 발생했습니다!', error);
            });
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{width: '100vh'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>문의 날짜</TableCell>
                            <TableCell>답변 날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                            <CustomTableRow key={question.id} onClick={() => openModal(question)}>
                                <CustomTableCell>{index + 1}</CustomTableCell>
                                <CustomTableCell>{question.question_title}</CustomTableCell>
                                <CustomTableCell>{question.name}</CustomTableCell>
                                <CustomTableCell>{question.answer_date ? '완료' : '대기'}</CustomTableCell>
                                <CustomTableCell>{question.question_date}</CustomTableCell>
                                <CustomTableCell>{question.answer_date || '-'}</CustomTableCell>
                            </CustomTableRow >
                        ))}
                    </TableBody>
                </Table>
                {questions && <TablePagination
                    component="div"
                    count={questions.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </TableContainer>
            <ReplyInquiryAlert 
                open={isModalOpen} 
                handleClose={closeModal} 
                question={selectedQuestion} 
                onSubmit={handleAnswerSubmit} 
            />
        </div>
    );
};

export default ReplyInquiry;
