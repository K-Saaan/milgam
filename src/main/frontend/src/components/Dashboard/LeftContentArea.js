import React from 'react';
import { Grid } from '@mui/material';
import CrowdCard from './CrowdCard';
import AbnormalBehaviorCard from './AbnormalBehaviorCard';
import CrowdTrendCard from './CrowdTrendCard';
import CrowdRatioCard from './CrowdRatioCard';
import MapCard from './MapCard';

// 대시보드 메인 화면의 좌측 영역
const LeftContentArea = () => {
  return (
    <Grid container spacing={2}>
      {/* 상단 카드 영역 */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CrowdCard />
          </Grid>
          <Grid item xs={3}>
            <AbnormalBehaviorCard />
          </Grid>
          <Grid item xs={3}>
            <CrowdTrendCard />
          </Grid>
          <Grid item xs={3}>
            <CrowdRatioCard />
          </Grid>
        </Grid>
      </Grid>
      {/* 지도 카드 */}
      <Grid item xs={12}>
        <MapCard />
      </Grid>
    </Grid>
  );
};

export default LeftContentArea;