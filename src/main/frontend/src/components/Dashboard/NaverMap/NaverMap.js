import React, { useEffect, useRef } from 'react';
import regions from '../data/regions';

/* global naver */

// NaverMap 컴포넌트
const NaverMap = ({ mapCenter, setMapCenter, crowdData, getCrowdColor }) => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const circlesRef = useRef([]);
  const previousCenter = useRef(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5365, 126.9780),
        zoom: 12,
      };

      mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);

      // 지도 이동 이벤트 추가
      naver.maps.Event.addListener(mapRef.current, 'dragend', () => {
        const center = mapRef.current.getCenter();
        setMapCenter({ lat: center.lat(), lng: center.lng() });
      });

      regions.forEach(region => {
        const markerOptions = {
          position: new naver.maps.LatLng(region.lat, region.lng),
          map: mapRef.current,
          title: region.value
        };

        new naver.maps.Marker(markerOptions);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Naver Maps script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [setMapCenter]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (previousCenter.current !== mapCenter) {
      mapRef.current.setCenter(new naver.maps.LatLng(mapCenter.lat, mapCenter.lng));
      mapRef.current.setZoom(15);
      previousCenter.current = mapCenter;
    }

    circlesRef.current.forEach(circle => circle.setMap(null));
    circlesRef.current = [];

    Object.keys(crowdData).forEach(regionName => {
      const regionInfo = regions.find(r => r.value === regionName);
      if (regionInfo) {
        const circleOptions = {
          map: mapRef.current,
          center: new naver.maps.LatLng(regionInfo.lat, regionInfo.lng),
          radius: 300,
          fillColor: getCrowdColor(crowdData[regionName]),
          fillOpacity: 0.3,
          strokeColor: getCrowdColor(crowdData[regionName]),
          strokeOpacity: 0.5,
          strokeWeight: 1
        };

        const newCircle = new naver.maps.Circle(circleOptions);
        circlesRef.current.push(newCircle);
      }
    });
  }, [mapCenter, crowdData, getCrowdColor]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
