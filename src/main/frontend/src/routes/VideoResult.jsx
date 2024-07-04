import React, { useState } from 'react';

import VideoContentArea from "../components/UploadVideo/VideoContentArea.js";
import VideoCardListArea from "../components/UploadVideo/VideoCardListArea.js";
import DashBackground from "../components/DashBackground.js";

function UploadVideo(){
    // 알림 목록
    const alerts = [
        { id: 1, time: '00:15', title: 'Lv.1 이상 행동 감지', details: '이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
        { id: 2, time: '00:03', title: '혼잡 (Lv.3)', details: '혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
    ];

    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <DashBackground name={"분석 결과"}
            contents={
                <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr' }}>
                    <VideoContentArea selectedItem={selectedItem}/>
                    <VideoCardListArea alerts={alerts} onSelect={handleSelect} selectedItem={selectedItem}/>
                </div>
            }
        />
      );
}

export default UploadVideo;