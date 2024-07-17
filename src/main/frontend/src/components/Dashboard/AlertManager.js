import React, { useState, useEffect } from 'react';
import {getAllDashboards} from '../../api/api.js'

const AlertManager = ({ setAlerts }) => {
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const dashboards = await getAllDashboards();
        const newAlerts = {};
        console.log("raw",dashboards)
        dashboards.forEach(alert => {
          const index = alert.analysisIndex;
          if (!newAlerts[index]){
            newAlerts[index]=[];
          }
          newAlerts[index].push(alert);
        });

        console.log('Processed Alerts Array:', newAlerts);
        
        setAlerts(newAlerts);
      } catch (error) {
        console.error('Failed to fetch dashboards:', error);
      }
    };

    fetchDashboards();
  }, [setAlerts]);

  return null; // 이 컴포넌트는 데이터를 가져오기만 하고 UI를 렌더링하지 않습니다.
};

export default AlertManager;
