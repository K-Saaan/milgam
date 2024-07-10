import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = 'http://openapi.seoul.go.kr:8088';

export const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${apiKey}/json/citydata_ppltn/1/2/광화문·덕수궁`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
