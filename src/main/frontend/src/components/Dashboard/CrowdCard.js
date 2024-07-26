import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { extractCrowdData } from '../../api/dataExtractor';
import { fetchData } from '../../api/fetchData';
import useStore from '../../store';
import CustomPaper from './styles/CustomPaper';

// 혼잡도 단계별 배경색 지정
const getBackgroundColor = (level, theme) => {
  switch (level) {
    case '붐빔':
      return theme.palette.crowd.busy; // 빨강
    case '약간 붐빔':
      return theme.palette.crowd.slightlyBusy; // 주황
    case '보통':
      return theme.palette.crowd.normal; // 노랑
    case '여유':
      return theme.palette.crowd.relaxed; // 초록
    default:
      return theme.palette.background.paper; // 기본 배경색
  }
};

/**
 * 1. ClassName: CrowdCard
 * 2. FileName : CrowdCard.js
 * 3. Package  : components.CrowdCard
 * 4. Comment  : 대시보드 혼잡도 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/

const CrowdCard = ({ }) => {
  const theme = useTheme();
  const { selectedRegion } = useStore(); // 선택된 지역을 Zustand 스토어에서 가져옵니다.
  const [ crowdData, setCrowdData] = useState({ areaNm: '', areaCongestLvl: '', areaCongestMsg: '' });
  const { data: jsonData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
  });

  
  useEffect(() => {
    if (jsonData) {
      const extractedData = extractCrowdData(jsonData);
      setCrowdData(extractedData);
    }
  }, [jsonData]);

  if (error) return <div>Error fetching data</div>;

  return (
    <Paper sx={CustomPaper(theme)}>
      {/* 로딩중 스켈레톤 적용 */}
      {isLoading ? (
        <Box>
          <Skeleton variant="text" width="60px" height="28px" />
          <Skeleton variant="text" width="100px" height="20px" />
          <Skeleton variant="text" width="80%" height="18px" />
        </Box>
      ) : (
        <>
          <Box sx={{ textAlign: 'center' }}> {/* 가운데 정렬을 위해 Box 추가 */}
            <Typography variant="subtitle1" gutterBottom>
              혼잡도
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                backgroundColor: getBackgroundColor(crowdData.areaCongestLvl, theme),
                color: theme.palette.getContrastText(getBackgroundColor(crowdData.areaCongestLvl, theme)),
                padding: '10px',
                paddingLeft: '40px', // 왼쪽 패딩을 키웁니다
                paddingRight: '40px', // 오른쪽 패딩을 키웁니다
                borderRadius: '4px',
                margin: '4px 0', // 위아래 margin 조정
                display: 'inline-block' // 아랫줄로 내려쓰기 위해 display 변경
              }}
            >
              {crowdData.areaCongestLvl}
            </Typography>
          </Box>
          <Box sx={{ marginTop: '8px', mx: '16px' }}>
            <Typography 
              sx={{
                color: theme.palette.text.primary,
                fontSize: '1rem',        
              }}
            >
              {crowdData.areaCongestMsg}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default CrowdCard;
