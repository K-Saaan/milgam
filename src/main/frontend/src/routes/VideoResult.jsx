import React, { useState } from 'react';
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

/**
 * 1. ClassName: VideoResult
 * 2. FileName : VideoResult.jsx
 * 3. Package  : routes
 * 4. Comment  : 영상 분석 결과 페이지
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 07. 02
 **/
function VideoResult(){
    // 분석 결과 리스트를 선택하면 내용이 바뀌도록 전달하는 역할
    const [selectedItem, setSelectedItem] = useState(null);
    // 클릭 시 비디오 이동
    const [isClicked, setClicked] = useState(0);

    // 리스트 선택 뿐 아니라 클릭도 관리하기 위해 카운트
    const handleSelect = (item) => {
        setSelectedItem(item);
        setClicked(isClicked + 1);
    };

    return (
        <DashBackground name={"분석 결과"}
            contents={
                <div style={containerStyle}>
                    {/* 비디오가 재생되는 왼쪽 부분 */}
                    <div style={leftSectionStyle}>
                        <VideoContentArea selectedItem={selectedItem} isClicked={isClicked}/>
                    </div>
                    {/* 결과 목록이 나타나는 오른쪽 부분 */}
                    <div style={rightSectionStyle}>
                        <VideoCardListArea
                            onSelect={handleSelect}
                            selectedItem={selectedItem}
                        />
                    </div>
                </div>
            }
        />
    );
}

export default VideoResult;