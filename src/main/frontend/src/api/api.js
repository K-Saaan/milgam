// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // API 서버의 기본 URL을 설정하세요.

export const getAllDashboards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboards/11`, {
      withCredentials: true // 쿠키를 포함한 요청
    });
    return response.data;
    
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
};
