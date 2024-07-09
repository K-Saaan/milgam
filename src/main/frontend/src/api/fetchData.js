import axios from 'axios';
import XMLParser from 'react-xml-parser';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = 'http://openapi.seoul.go.kr:8088';

export const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/${apiKey}/xml/citydata/1/2/광화문·덕수궁`);
      // console.log(response.data); // 응답 데이터 출력
      const xml = new XMLParser().parseFromString(response.data);
      // console.log(xml); // 파싱된 데이터 출력
      return xml;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
