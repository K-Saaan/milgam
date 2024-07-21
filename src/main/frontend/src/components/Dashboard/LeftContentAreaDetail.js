import React from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Paper, Typography, IconButton, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import axios from 'axios';
import AlertManager from './AlertManager';

// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '520px',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
});

// 제목 + 닫기 버튼 박스 스타일
const headerBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 2,
};

// 제목 스타일
const titleStyle = (theme) => ({
  color: theme.palette.text.primary,
});

// TableHead 스타일
const CustomTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

// TableCell 스타일
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

// TableContainer 스타일
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  flex: 1,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari, Opera
  },
  '-ms-overflow-style': 'none',  // IE and Edge
  'scrollbar-width': 'none',  // Firefox
}));

// 날짜 형식을 yyyy-mm-dd hh:mm로 변환하는 함수
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// TableRow 스타일
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Hover 시 색상 변경
  },
}));

const LeftContentAreaDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isAdmin = location.pathname.startsWith('/admin');

  const { alerts, setAlerts } = useOutletContext();
  const alertData = location.state?.alert || []; // 전달받은 알림 데이터

  const handleCloseClick = () => {
    const targetPath = isAdmin ? '/admin/dashboard' : '/dashboard';
    navigate(targetPath);
  };

  const onRowClick = async (row) => {
    // UI 즉시 업데이트
    const updatedAlerts = { ...alerts };
    const alertIndex = Object.keys(updatedAlerts).find(key => 
      updatedAlerts[key].some(alert => alert.logIndex === row.logIndex)
    );
    if (alertIndex) {
      updatedAlerts[alertIndex] = updatedAlerts[alertIndex].map(alert =>
        alert.logIndex === row.logIndex ? { ...alert, read: true } : alert
      );
    }
    setAlerts(updatedAlerts);

    try {
      // 백엔드에 PATCH 요청 보내기
      await axios.patch('/dashboards/update', { 
        logIndex: row.logIndex,
        confirm: row.read,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('PATCH 요청 성공:', row.logIndex);
      <AlertManager setAlerts={setAlerts} />
    } catch (error) {
      console.error('PATCH 요청 실패:', error);
    }
  };

  return (
    <Paper sx={{...paperStyle(theme)}}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h5" sx={titleStyle(theme)}>
          알림 상세 내용
        </Typography>
        <IconButton onClick={handleCloseClick}>
          <CloseIcon />
        </IconButton>
      </Box>
      {/* 테이블 */}
      <CustomTableContainer>
        <Table>
          <CustomTableHead>
            <TableRow>
              <CustomTableCell sx={{ width: '15%' }}>시간</CustomTableCell>
              <CustomTableCell sx={{ width: '40%' }}>상황 및 제안</CustomTableCell>
              <CustomTableCell sx={{ width: '10%' }}>혼잡도</CustomTableCell>
              <CustomTableCell sx={{ width: '15%' }}>이상 행동</CustomTableCell>
              <CustomTableCell sx={{ width: '10%' }}>확인</CustomTableCell>
            </TableRow>
          </CustomTableHead>
          <TableBody>
          {alertData.length > 0 ? (
            alertData.map((row, index) => (
              <CustomTableRow key={index} onClick={() => onRowClick(row)}>
                <CustomTableCell>{formatDate(row.date)}</CustomTableCell>
                <CustomTableCell>{row.context}</CustomTableCell>
                <CustomTableCell>{row.contextTitle}</CustomTableCell>
                <CustomTableCell>{row.crowdLevel}</CustomTableCell>
                <CustomTableCell>{row.read ? '읽음' : '안읽음'}</CustomTableCell>
              </CustomTableRow>
            ))
          ) : (
            <TableRow>
              <CustomTableCell colSpan={5} align="center">
                No data available
              </CustomTableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Paper>
  );
};

export default LeftContentAreaDetail;
