// CrowdCard.js - 혼잡도 관련 데이터를 추출하는 함수
export const extractCrowdData = (xmlData) => {
    console.log('xmlData:', xmlData);
    
    // 장소 이름
    const cityData = xmlData.getElementsByTagName('CITYDATA')[0]?.children;
    // const areaNm = cityData.find(node => node.name === 'AREA_NM')?.value;
    const livePpltnSttsNode = cityData.find(node => node.name === 'LIVE_PPLTN_STTS');
    const livePpltnStts = livePpltnSttsNode?.children[0]?.children;
  
    if (!livePpltnStts) {
      console.error('livePpltnStts is undefined or null');
      return { areaNm: '', areaCongestLvl: '', areaCongestMsg: '' };
    }
  
    // 혼잡도 레벨
    const areaCongestLvl = livePpltnStts.find(node => node.name === 'AREA_CONGEST_LVL')?.value;
    // 혼잡도 메시지
    const areaCongestMsg = livePpltnStts.find(node => node.name === 'AREA_CONGEST_MSG')?.value;
  
    return { areaCongestLvl, areaCongestMsg };
};


// CrowdTrendCard.js - 예측 혼잡도 데이터를 추출하는 함수
export const extractForecastData = (xmlData) => {
    console.log('xmlData:', xmlData);
  
    const fcstData = xmlData.getElementsByTagName('FCST_PPLTN');
    const forecast = Array.from(fcstData).map(fcst => ({
      // 예측 시간
      time: fcst.getElementsByTagName('FCST_TIME')[0]?.value,
      // 예측 혼잡도
      level: fcst.getElementsByTagName('FCST_CONGEST_LVL')[0]?.value,
      // 예측 인구수 최소값
      ppltnMin: fcst.getElementsByTagName('FCST_PPLTN_MIN')[0]?.value,
      // 예측 인구수 최대값
      ppltnMax: fcst.getElementsByTagName('FCST_PPLTN_MAX')[0]?.value,
    }));
  
    return forecast;
  };


// CrowdRatioCard.js - 10대부터 70대까지의 실시간 인구 비율 데이터를 추출하는 함수
export const extractPopulationRates = (xmlData) => {
    console.log('xmlData:', xmlData);
    
    // 장소 이름
    const cityData = xmlData.getElementsByTagName('CITYDATA')[0]?.children;
    const livePpltnSttsNode = cityData.find(node => node.name === 'LIVE_PPLTN_STTS');
    const livePpltnStts = livePpltnSttsNode?.children[0]?.children;
  
    if (!livePpltnStts) {
      console.error('livePpltnStts is undefined or null');
      return { ppltnRate10: 0, ppltnRate20: 0, ppltnRate30: 0, ppltnRate40: 0, ppltnRate50: 0, ppltnRate60: 0, ppltnRate70: 0 };
    }

    // 인구 비율 데이터 추출
    const ppltnRate10 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_10')?.value) || 0;
    const ppltnRate20 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_20')?.value) || 0;
    const ppltnRate30 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_30')?.value) || 0;
    const ppltnRate40 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_40')?.value) || 0;
    const ppltnRate50 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_50')?.value) || 0;
    const ppltnRate60 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_60')?.value) || 0;
    const ppltnRate70 = parseFloat(livePpltnStts.find(node => node.name === 'PPLTN_RATE_70')?.value) || 0;
  
    return { ppltnRate10, ppltnRate20, ppltnRate30, ppltnRate40, ppltnRate50, ppltnRate60, ppltnRate70 };
};


// MapCard.js - 지역명 추출하는 함수
export const extractLocationName = (xmlData) => {
    console.log('extractLocationName - XML Data:', xmlData);
    const cityData = xmlData.getElementsByTagName('CITYDATA')[0]?.children;
    const areaNm = cityData.find(node => node.name === 'AREA_NM')?.value;
    console.log('extractLocationName - areaNm:', areaNm);
    return areaNm || 'Unknown Location';
};