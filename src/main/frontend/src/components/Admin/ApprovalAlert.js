import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button, Divider, Table, TableBody, TableCell, TableContainer,
    TableRow, Paper, CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import axios from 'axios';

const ActionStyle = styled(DialogActions)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const BtnStyle = styled(Button)(({ theme }) => ({
    width: "40%",
    margin: "10px",
    marginTop: "10px",
    '&:hover': {
        backgroundColor: 'inherit'
    }
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
}));

const CustomDialogContentText = styled(DialogContentText)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const ApprovalAlert = ({ open, handleClose, handleApprovalOrRejection, inquiry }) => {
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        if (inquiry && inquiry.user_index) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    /*const instance = axios.create({
                        withCredentials: true, // 쿠키 포함 설정
                    });*/

                    //const response = await instance.get(`/admin/userdetail?user_index=${inquiry.user_index}`);
                    const response = await axios.get(`/admin/userdetail?user_index=${inquiry.user_index}`);
                    if (isMounted) {
                        setData(response.data[0]);
                    }
                } catch (err) {
                    setError('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
                    console.error(err);
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            };
            fetchData();

            return () => {
                isMounted = false;
            };
        }
    }, [inquiry]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>회원가입 상세 정보</DialogTitle>
            <Divider style={{ background: theme.palette.divider }} />
            <DialogContent sx={{minWidth:'560px'}}>
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </div>
                )}
                {!data && error && (
                    <CustomDialogContentText>
                        {error}
                    </CustomDialogContentText>
                )}
                {data && !loading && (
                    <>
                        <DialogContentText style={{ marginBottom: '15px' }}>
                            {data.name}님의 회원가입을 승인하시겠습니까?
                        </DialogContentText>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow key="id-row">
                                        <CustomTableCell><strong>아이디</strong></CustomTableCell>
                                        <CustomTableCell>{data.id}</CustomTableCell>
                                        <CustomTableCell />
                                        <CustomTableCell><strong>이메일</strong></CustomTableCell>
                                        <CustomTableCell>{data.email}</CustomTableCell>
                                    </TableRow>
                                    <TableRow key="name-row">
                                        <CustomTableCell><strong>이름</strong></CustomTableCell>
                                        <CustomTableCell>{data.name}</CustomTableCell>
                                        <CustomTableCell />
                                        <CustomTableCell><strong>전화번호</strong></CustomTableCell>
                                        <CustomTableCell>{data.phone}</CustomTableCell>
                                    </TableRow>
                                    <TableRow key="role-row">
                                        <CustomTableCell><strong>구분</strong></CustomTableCell>
                                        <CustomTableCell>{data.role}</CustomTableCell>
                                        <CustomTableCell /><CustomTableCell /><CustomTableCell />
                                    </TableRow>
                                    <TableRow key="dates-row">
                                        <CustomTableCell><strong>시작 날짜</strong></CustomTableCell>
                                        <CustomTableCell>{formatDate(data.start_date)}</CustomTableCell>
                                        <CustomTableCell />
                                        <CustomTableCell><strong>종료 날짜</strong></CustomTableCell>
                                        <CustomTableCell>{formatDate(data.end_date)}</CustomTableCell>
                                    </TableRow>
                                    <TableRow key="org-row">
                                        <CustomTableCell><strong>조직</strong></CustomTableCell>
                                        <CustomTableCell>{data.org}</CustomTableCell>
                                        <CustomTableCell />
                                        <CustomTableCell><strong>조직 전화번호</strong></CustomTableCell>
                                        <CustomTableCell>{data.org_phone}</CustomTableCell>
                                    </TableRow>
                                    <TableRow key="status-row">
                                        <CustomTableCell><strong>상태</strong></CustomTableCell>
                                        <CustomTableCell>
                                            {data.status === 'completed' ? '승인' : data.status === 'rejected' ? '거절' : '진행중'}
                                        </CustomTableCell>
                                        <CustomTableCell /><CustomTableCell /><CustomTableCell />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </DialogContent>
            <ActionStyle>
                <BtnStyle variant="contained" onClick={handleClose} sx={{ backgroundColor: theme.palette.cancel }}>
                    취소
                </BtnStyle>
                {data && data.status !== '거절' && (
                    <BtnStyle variant="contained" onClick={() => handleApprovalOrRejection('rejected')} sx={{ backgroundColor: theme.palette.warn }}>
                        거절
                    </BtnStyle>
                )}
                {data && data.status !== '승인' && (
                    <BtnStyle variant="contained" onClick={() => handleApprovalOrRejection('completed')} sx={{ backgroundColor: theme.palette.comp }}>
                        승인
                    </BtnStyle>
                )}
            </ActionStyle>
        </Dialog>
    );
};

export default ApprovalAlert;
