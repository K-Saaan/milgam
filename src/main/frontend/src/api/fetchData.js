import axios from 'axios';
import { regions } from '../components/Dashboard/data/regions'

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = 'http://openapi.seoul.go.kr:8088';
const validRegions = regions.map(region => region.value);

/*
  * 1. FunctionName: fetchData
  * 2. FileName : fetchData.js
  * 2. Comment   : 선택된 region에 해당하는 데이터 요청
  * 3. 작성자    : mijin
  * 4. 작성일    : 2024. 07. 11
*/
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