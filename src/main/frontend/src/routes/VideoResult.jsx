import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoContentArea from "../components/UploadVideo/VideoContentArea.js";
import VideoCardListArea from "../components/UploadVideo/VideoCardListArea.js";
import DashBackground from "../components/DashBackground.js";
import { Stomp } from '@stomp/stompjs';

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '7fr 3fr',
  gap: '10px',
};

const leftSectionStyle = {
  display: 'grid',
  gap: '10px',
};

const rightSectionStyle = {
  display: 'grid',
  gap: '10px',
  minWidth: '300px',
};

function VideoResult(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 서버로부터 데이터 가져오기
    useEffect(() => {
        const client = Stomp.client('ws://localhost:8080/ws');

        // 받아온 데이터를 상태에 저장합니다.
        client.connect({}, () => {
            client.subscribe('/topic/analysis', (message) => {
                setData(prevResults => [...prevResults, message.body]);
            });
        }, (error) => {
            console.error('Connection error:', error);
            setError("서버에 연결할 수 없습니다.");
            setLoading(false);
        });

        return () => {
            client.disconnect();
            setLoading(false);
        };
    }, []);

    // 분석 결과 리스트를 선택하면 내용이 바뀌도록 전달하는 역할
    const [selectedItem, setSelectedItem] = useState(null);
    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <DashBackground name={"분석 결과"}
            contents={
                <div style={containerStyle}>
                    {/* 비디오가 재생되는 왼쪽 부분 */}
                    <div style={leftSectionStyle}>
                        <VideoContentArea selectedItem={selectedItem}/>
                    </div>
                    {/* 결과 목록이 나타나는 오른쪽 부분 */}
                    <div style={rightSectionStyle}>
                        <VideoCardListArea
                            alerts={data}
                            onSelect={handleSelect}
                            selectedItem={selectedItem}
                            isLoading={loading}
                            error={error}
                        />
                    </div>
                </div>
            }
        />
      );
}

export default VideoResult;