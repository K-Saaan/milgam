import { useEffect } from 'react';
import { getAllLogs, getAllMessages } from '../../api/api.js';

export const AlertManager = ({ setAlerts, setLoading }) => {
  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const massages = await getAllLogs();
        const manages = await getAllMessages();
        const newAlerts = {};
        
        // console.log("Fetched logs:", massages);
        // console.log("Fetched messages:", manages);

        // 맵으로 manage 정보를 빠르게 찾기 위해 맵핑
        const manageMap = manages.reduce((map, manage) => {
          map[manage.logIndex] = manage;
          return map;
        }, {});
        //console.log("Processed manageMap:", manageMap);

        massages.forEach(alert => {
          const index = alert.analysisIndex;
          const logIndex = alert.logIndex;
          const manageInfo = manageMap[logIndex] || {};

          if (!newAlerts[index]) {
            newAlerts[index] = [];
          }

          newAlerts[index].push({
            ...alert,
            confirm: manageInfo.confirm !== undefined ? manageInfo.confirm : false,
            userIndex: manageInfo.userIndex !== undefined ? manageInfo.userIndex : alert.userIndex,
            context: manageInfo.context !== undefined ? manageInfo.context : alert.context,
            contextTitle: manageInfo.contextTitle !== undefined ? manageInfo.contextTitle : alert.contextTitle,
            date: manageInfo.date !== undefined ? manageInfo.date : alert.date
          });
        });

        //console.log('Processed Alerts Array:', newAlerts);
        
        setAlerts(newAlerts);
      } catch (error) {
        //console.error('Failed to fetch dashboards:', error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchDashboards();
  }, [setAlerts, setLoading]);

  return null; // 이 컴포넌트는 데이터를 가져오기만 하고 UI를 렌더링하지 않습니다.
};

export const SseComponent = ({ setAlerts }) => {
  useEffect(() => {
    const eventSource = new EventSource('/sse');

    eventSource.addEventListener('message-log', function(event) {
      const newMessage = JSON.parse(event.data);
      console.log('Received SSE message:', newMessage);
      setAlerts(prevAlerts => {
        const updatedAlerts = { ...prevAlerts };
        const index = newMessage.analysisIndex;
        if (!updatedAlerts[index]) {
          updatedAlerts[index] = [];
        }
        updatedAlerts[index].push(newMessage);
        return updatedAlerts;
      });
    });

    eventSource.onerror = function(err) {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [setAlerts]);

  return null;
};

