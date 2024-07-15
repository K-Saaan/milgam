// CrowdCard.js - 혼잡도 관련 데이터를 추출하는 함수
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


// CrowdTrendCard.js - 예측 혼잡도 데이터를 추출하는 함수
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



// CrowdRatioCard.js - 10대부터 70대까지의 실시간 인구 비율 데이터를 추출하는 함수
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

// MapCard.js - 혼잡도 추출 함수
export const extractCrowdDataToMap = (jsonData) => {
    if (!jsonData || !jsonData['SeoulRtd.citydata_ppltn'] || !jsonData['SeoulRtd.citydata_ppltn'][0]) {
        console.error('Invalid JSON data:', jsonData);
        return { areaNm: '', areaCongestLvl: '', areaCongestMsg: '' };
    }

    const cityData = jsonData['SeoulRtd.citydata_ppltn'][0];
    const areaCongestLvl = cityData.AREA_CONGEST_LVL;

    return { areaCongestLvl };
};