import React, { useEffect, useRef } from 'react';
import regions from '../data/regions';

/* global naver */

// NaverMap 컴포넌트
const NaverMap = ({ region, color }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null); // 지도 객체를 저장할 ref
  const circlesRef = useRef([]); // 원 객체들을 저장할 ref

  useEffect(() => {
    if (!mapElement.current) return;

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      try {
        const mapOptions = {
          center: new naver.maps.LatLng(37.5365, 126.9780), // 지도 초기 중심 좌표
          zoom: 11.5
        };

        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);

        regions.forEach(region => {
          const markerOptions = {
            position: new naver.maps.LatLng(region.lat, region.lng),
            map: mapRef.current,
            title: region.value
          };

          new naver.maps.Marker(markerOptions);
        });
      } catch (error) {
        console.error("Naver Map initialization error:", error);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Naver Maps script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !region.lat || !region.lng) return;

    const newCenter = new naver.maps.LatLng(region.lat, region.lng);
    mapRef.current.setCenter(newCenter);
    mapRef.current.setZoom(15);

    // 기존 원들을 제거
    circlesRef.current.forEach(circle => circle.setMap(null));
    circlesRef.current = [];

    if (color) {
      const circleOptions = {
        map: mapRef.current,
        center: newCenter,
        radius: 300, // 크기
        fillColor: color,
        fillOpacity: 0.3, // 채우기 투명도
        strokeColor: color,
        strokeOpacity: 0.5, // 테두리 투명도
        strokeWeight: 1
      };

      // 새로운 원을 그리고 circlesRef에 추가
      const newCircle = new naver.maps.Circle(circleOptions);
      circlesRef.current.push(newCircle);
    }
  }, [region, color]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
