// api.js
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

const API_BASE_URL = ''; // API 서버의 기본 URL을 설정하세요.

export const getAllLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboards/user/message-logs`, {
      withCredentials: true // 쿠키를 포함한 요청
    });
    const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedData;
    
  } catch (error) {
    console.error('Error get dashboards:', error);
    throw error;
  }
};

export const getAllMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboards/manage-all`, {
      withCredentials: true // 쿠키를 포함한 요청
    });
    // console.log('response 값:', response);
  
    return response.data;

  } catch (error) {
    console.error('Error get dashboards:', error);
    throw error;
  }
};
