import React, { useEffect, useRef } from 'react';

/* global naver */

// NaverMap 컴포넌트
const NaverMap = (crowdLevel ) => {
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current) return;

    // 네이버 지도 API 스크립트 추가
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5265, 126.9780), // 지도 초기 중심 좌표
        zoom: 11.5
      };

      new naver.maps.Map(mapElement.current, mapOptions);
    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
