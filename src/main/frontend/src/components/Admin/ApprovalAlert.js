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

/**
 * 1. ClassName: ApprovalAlert
 * 2. FileName : ApprovalAlert.js
 * 3. Package  : components.Admin
 * 4. Comment  : 회원 가입 신청 승인 상세 페이지
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 04
 **/
const ApprovalAlert = ({ open, handleClose, handleApprovalOrRejection, inquiry }) => {
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 1. MethodName: -
     * 2. ClassName : ApprovalAlert
     * 3. Comment   : 가입 승인 상세 정보 요청
     * 4. 작성자    : boreum
     * 5. 작성일    : 2024. 07. 10
     **/
    useEffect(() => {
        let isMounted = true;

        if (inquiry && inquiry.user_index) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
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

    //타임스탬프 형식의 날짜를 포맷팅
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>회원가입 상세 정보</DialogTitle>
            <Divider style={{ background: theme.palette.divider }} />
            <DialogContent sx={{minWidth:'560px'}}>
                {/* 로딩 중 */}
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </div>
                )}
                {/* 오류 처리 */}
                {!data && error && (
                    <CustomDialogContentText>
                        {error}
                    </CustomDialogContentText>
                )}
                {/* 로딩 성공 */}
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
                                            {data.status === '승인' ? '승인' : data.status === '거절' ? '거절' : '진행중'}
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
                {/* 상태에 따라 버튼 나타남 */}
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
