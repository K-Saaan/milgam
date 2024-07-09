import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, IconButton , Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '520px',
  borderRadius: 2,
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
}));

// 테이블 데이터 예시
const tableData = [
  { time: '11:03', situation: '2구역 혼잡도 주의', details: '주의', behavior: '이상 행동 감지' },
  { time: '12:45', situation: '2구역 혼잡', details: '혼잡', behavior: '이상 행동 감지' },
  { time: '12:53', situation: '2구역 Lv.1 이상 행동 감지', details: '혼잡', crowdLevel: 'Lv.1', behavior: '이상 행동 감지' },
];

const LeftContentAreaDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCloseClick = () => {
    navigate('/dashboard');
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
              <CustomTableCell>시간</CustomTableCell>
              <CustomTableCell>상황 및 제안</CustomTableCell>
              <CustomTableCell>혼잡도</CustomTableCell>
              <CustomTableCell>이상 행동</CustomTableCell>
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <CustomTableCell>{row.time}</CustomTableCell>
                <CustomTableCell>{row.situation}</CustomTableCell>
                <CustomTableCell>{row.details}</CustomTableCell>
                <CustomTableCell>{row.crowdLevel}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Paper>
  );
};

export default LeftContentAreaDetail;