import VideoContentArea from "../components/UploadVideo/VideoContentArea.js";
import VideoCardListArea from "../components/UploadVideo/VideoCardListArea.js";
import Container from '@mui/material/Container';

function UploadVideo(){
    // 알림 목록
    const alerts = [
        { id: 1, time: '12:53', title: 'Lv.1 이상 행동 감지', details: '이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
        { id: 2, time: '14:02', title: '혼잡 (Lv.3)', details: '혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr' }}>
          <Container>
            <VideoContentArea />
          </Container>
          <Container>
              <VideoCardListArea alerts={alerts}/>
          </Container>
        </div>
      );
}

export default UploadVideo;