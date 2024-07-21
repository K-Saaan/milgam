// api.js
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const API_BASE_URL = ''; // API 서버의 기본 URL을 설정하세요.

export const getAllDashboards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboards/user/message-logs`, {
      withCredentials: true // 쿠키를 포함한 요청
    });
    const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedData;
    
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
};
