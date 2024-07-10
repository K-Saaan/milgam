import React, { useEffect, useRef } from 'react';
import regions from '../data/regions'

/* global naver */

// NaverMap 컴포넌트
const NaverMap = ({ region, color }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current) return;

    // 네이버 지도 API 스크립트 추가
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(region.lat, region.lng), // 지도 초기 중심 좌표
        zoom: 15
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);

      if(color) {
          // Circle options
          const circleOptions = {
            map: map,
            center: new naver.maps.LatLng(region.lat, region.lng),
            radius: 300, //크기
            fillColor: color,
            fillOpacity: 0.3,
            strokeColor: color,
            strokeOpacity: 0.7,
            strokeWeight: 1
          };

          // Draw circle on the map
          const circle = new naver.maps.Circle(circleOptions);
      }

      regions.forEach(region => {
        const markerOptions = {
          position: new naver.maps.LatLng(region.lat, region.lng),
          map: map,
          title: region.name
        };

        const marker = new naver.maps.Marker(markerOptions);
      });
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      document.head.removeChild(script);
    };
  }, [region]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
