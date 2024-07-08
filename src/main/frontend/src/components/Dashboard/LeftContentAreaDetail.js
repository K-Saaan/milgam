import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, IconButton , Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

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

// 테이블 데이터 예시
const tableData = [
  { time: '11:03', situation: '2구역 혼잡도 주의', details: '주의', behavior: '이상 행동 감지' },
  { time: '12:45', situation: '2구역 혼잡', details: '혼잡', behavior: '이상 행동 감지' },
  { time: '12:53', situation: '2구역 Lv.1 이상 행동 감지', details: '혼잡', crowdLevel: 'Lv.1', behavior: '이상 행동 감지' },
];

const LeftContentAreaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // 여기에 id에 따른 내용을 설정합니다.
  // 예시로 간단한 데이터를 설정하였습니다.
  const alertDetails = {
    1: '2구역에서 Lv.1 이상 행동이 감지되었습니다. 자세한 내용은 ...',
    2: '5구역에서 Lv.3 혼잡이 발생했습니다. 자세한 내용은 ...',
  };

  const handleCloseClick = () => {
    navigate('/dashboard');
  };

  return (
    <Paper sx={paperStyle(theme)}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h5" sx={titleStyle(theme)}>
          알림 상세 내용
        </Typography>
        <IconButton onClick={handleCloseClick} color='lightGrey'>
          <CloseIcon />
        </IconButton>
      </Box>
      {/* 테이블 */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#323D4E' , borderRadius: 2 }}>
              <TableCell sx={{ color: 'white' }}>시간</TableCell>
              <TableCell sx={{ color: 'white' }}>상황 및 제안</TableCell>
              <TableCell sx={{ color: 'white' }}>혼잡도</TableCell>
              <TableCell sx={{ color: 'white' }}>이상 행동</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{row.time}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.situation}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.details}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.crowdLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeftContentAreaDetail;