import React, { useState } from 'react';

import VideoContentArea from "../components/UploadVideo/VideoContentArea.js";
import VideoCardListArea from "../components/UploadVideo/VideoCardListArea.js";
import DashBackground from "../components/DashBackground.js";

function UploadVideo(){
    // 알림 목록 더미 데이터
    const alerts = [
        { id: 1, time: '00:15', title: 'Lv.1 이상 행동 감지', details: '이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
        { id: 2, time: '00:03', title: '혼잡 (Lv.3)', details: '혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
    ];

    // 분석 결과 리스트를 선택하면 내용이 바뀌도록 전달하는 역할
    const [selectedItem, setSelectedItem] = useState(null);
    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <DashBackground name={"분석 결과"}
            contents={
                <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '10px'}}>
                    {/* 비디오가 재생되는 왼쪽 부분 */}
                    <div style={{ display: 'grid', gap: '10px' }}>
                        <VideoContentArea selectedItem={selectedItem}/>
                    </div>
                    {/* 결과 목록이 나타나는 오른쪽 부분 */}
                    <div style={{ display: 'grid', gap: '10px', minWidth: '300px' }}>
                        <VideoCardListArea alerts={alerts} onSelect={handleSelect} selectedItem={selectedItem}/>
                    </div>
                </div>
            }
        />
      );
}

export default UploadVideo;