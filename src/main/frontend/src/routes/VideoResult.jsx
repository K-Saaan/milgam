import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoContentArea from "../components/UploadVideo/VideoContentArea.js";
import VideoCardListArea from "../components/UploadVideo/VideoCardListArea.js";
import DashBackground from "../components/DashBackground.js";


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
        const fetchData = async () => {
            try {
                const response = await axios.get('/getData');

                // 받아온 데이터를 상태에 저장합니다.
                setData(response.data);
                setLoading(false); // 로딩 상태를 false로 변경하여 로딩 완료를 표시합니다.
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("오류가 발생하여 데이터를 불러오지 못했습니다. ")
                setLoading(false);
            }
        };

        fetchData();
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