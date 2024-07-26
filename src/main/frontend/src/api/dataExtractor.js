/*
  * 1. FunctionName: extractCrowdData
  * 2. FileName : dataExtractor.java
  * 3. Comment   : 서울시 인구 데이터 api에서 받아온 데이터 중 혼잡도만 추출 (CrowdCard.js)
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 07. 10
*/
export const extractCrowdData = (jsonData) => {
    if (!jsonData || !jsonData['SeoulRtd.citydata_ppltn'] || !jsonData['SeoulRtd.citydata_ppltn'][0]) {
        console.error('Invalid JSON data:', jsonData);
        return { areaNm: '', areaCongestLvl: '', areaCongestMsg: '' };
    }

    const cityData = jsonData['SeoulRtd.citydata_ppltn'][0];
    const areaCongestLvl = cityData.AREA_CONGEST_LVL;
    const areaCongestMsg = cityData.AREA_CONGEST_MSG;

    return { areaCongestLvl, areaCongestMsg };
};


/*
  * 1. FunctionName: extractCrowdData
  * 2. FileName : dataExtractor.java
  * 3. Comment   : 서울시 인구 데이터 api에서 받아온 데이터 중 혼잡도 예측 데이터만 추출 (CrowdTrendCard.js)
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 07. 10
*/
export const extractForecastData = (jsonData) => {
    if (!jsonData || !jsonData['SeoulRtd.citydata_ppltn'] || !jsonData['SeoulRtd.citydata_ppltn'][0]) {
        console.error('Invalid JSON data:', jsonData);
        return [];
    }

    const fcstData = jsonData['SeoulRtd.citydata_ppltn'][0].FCST_PPLTN || [];
    const forecast = fcstData.map(fcst => ({
        time: fcst.FCST_TIME,
        level: fcst.FCST_CONGEST_LVL,
        ppltnMin: fcst.FCST_PPLTN_MIN,
        ppltnMax: fcst.FCST_PPLTN_MAX,
    }));

    return forecast;
};


/*
  * 1. FunctionName: extractCrowdData
  * 2. FileName : dataExtractor.java
  * 3. Comment   : 서울시 인구 데이터 api에서 받아온 데이터 중 실시간 인구 비율 데이터 추출 (CrowdRatioCard.js)
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 07. 10
*/
export const extractPopulationRates = (jsonData) => {
    if (!jsonData || !jsonData['SeoulRtd.citydata_ppltn'] || !jsonData['SeoulRtd.citydata_ppltn'][0]) {
        console.error('Invalid JSON data:', jsonData);
        return { ppltnRate10: 0, ppltnRate20: 0, ppltnRate30: 0, ppltnRate40: 0, ppltnRate50: 0, ppltnRate60: 0, ppltnRate70: 0 };
    }

    const cityData = jsonData['SeoulRtd.citydata_ppltn'][0];
    const ppltnRate10 = parseFloat(cityData.PPLTN_RATE_10) || 0;
    const ppltnRate20 = parseFloat(cityData.PPLTN_RATE_20) || 0;
    const ppltnRate30 = parseFloat(cityData.PPLTN_RATE_30) || 0;
    const ppltnRate40 = parseFloat(cityData.PPLTN_RATE_40) || 0;
    const ppltnRate50 = parseFloat(cityData.PPLTN_RATE_50) || 0;
    const ppltnRate60 = parseFloat(cityData.PPLTN_RATE_60) || 0;
    const ppltnRate70 = parseFloat(cityData.PPLTN_RATE_70) || 0;

    return { ppltnRate10, ppltnRate20, ppltnRate30, ppltnRate40, ppltnRate50, ppltnRate60, ppltnRate70 };
};

/*
  * 1. FunctionName: extractCrowdData
  * 2. FileName : dataExtractor.js
  * 3. Comment   : 서울시 인구 데이터 api에서 받아온 데이터 중 혼잡도 데이터 추출 (MapCard.js)
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 07. 10
*/
export const extractCrowdDataToMap = (jsonData) => {
    if (!jsonData || !jsonData['SeoulRtd.citydata_ppltn'] || !jsonData['SeoulRtd.citydata_ppltn'][0]) {
        console.error('Invalid JSON data:', jsonData);
        return { areaNm: '', areaCongestLvl: '', areaCongestMsg: '' };
    }

    const cityData = jsonData['SeoulRtd.citydata_ppltn'][0];
    const areaCongestLvl = cityData.AREA_CONGEST_LVL;

    return { areaCongestLvl };
};