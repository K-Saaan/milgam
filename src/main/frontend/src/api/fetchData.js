import axios from 'axios';
import { regions } from '../components/Dashboard/data/regions'

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = 'http://openapi.seoul.go.kr:8088';

// regions.js 파일에서 유효한 지역 목록을 가져옴
const validRegions = regions.map(region => region.value);

export const fetchData = async (region) => {
  console.log("Fetching data for region:", region);
  // region 값이 유효하지 않으면 기본 값 사용
  const selectedRegion = validRegions.includes(region) ? region : '광화문·덕수궁';

  try {
    const response = await axios.get(`${apiUrl}/${apiKey}/json/citydata_ppltn/1/2/${encodeURIComponent(selectedRegion)}`);
    console.log("Fetching data URL:", `${apiUrl}/${apiKey}/json/citydata_ppltn/1/2/${encodeURIComponent(selectedRegion)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};