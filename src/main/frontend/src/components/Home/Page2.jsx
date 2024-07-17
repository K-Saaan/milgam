import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import First from "./gif_icon/1.gif"
import Second from "./gif_icon/2.gif"
import Third from "./gif_icon/3.gif"
import Fourth from "./gif_icon/4.gif"
import Fifth from "./gif_icon/5.gif"
import Sixth from "./gif_icon/6.gif"

// page
const cPage2Style = (theme) => ({
  widht:'100%',
  hegiht:'100%',
  // background: theme.palette.comp,
  color : theme.palette.text.primary,
});

// mainTitle
const cMainTitlerStyle = (theme) => ({
  display: "flex",
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  fontSize:'2.7rem',
  fontWeight: 800,
  marginBottom: '20px'
});


// conatiner
const cContainerStyle = (theme) => ({
  display:'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: '10px', 
  padding: '20px',
});

// cell
const cCellStyle = (theme) => ({
  width: '414px',
  height: '340px',
  // backgroundColor: 'ivory',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'

})

// cell gif
const cGifStyle = (theme) => ({
  width:'100px', height:'100px'
})

// cell paragraph
const cCellParaStyle = (theme) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  color:theme.palette.primary,
  width: '90%'
})

// cell spanTitle
const cCellTitleStyle = (theme) => ({
  textAlign : 'center',
  fontSize:'1.5rem',
  fontWeight:600,
  marginBottom:'10px',
  marginTop:'10px',
})

function Page2(){

  const theme = useTheme();
  const pageStyle = cPage2Style(theme);
  const containerStyle = cContainerStyle(theme);
  const mainTitleStyle = cMainTitlerStyle(theme);
  const cellStyle = cCellStyle(theme);
  const cellPStyle = cCellParaStyle(theme);
  const gifStyle = cGifStyle(theme);
  const titleStyle = cCellTitleStyle(theme);

  function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  
      return (
          <>
          
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 1,
                y: { duration: 1 },
            }}
            style={pageStyle}
            >
              <div style={mainTitleStyle}>
                <span>
                  크라우드 매니지먼트에 필요한 모든 기능을
                </span>
                <span>
                  밀감 하나로
                </span>
              </div>
              <div style={containerStyle}>
                <div style={cellStyle}>
                  <img style={gifStyle} src={First} alt="gif" />
                  <span style={titleStyle}>실시간 혼잡도 파악</span>
                  <div style={cellPStyle}>
                    <span>서울시 지역별 실시간 혼잡도 파악</span>
                    <span>밀감으로 한눈에 확인</span>
                  </div>
                </div>
                <div style={cellStyle}>
                  <img style={gifStyle} src={Second} alt="gif" />
                  <span style={titleStyle}>연령별 유동인구 예측 및 파악</span>
                  <div style={cellPStyle}>
                    <span>시간대별 서울시 유동인구</span>
                    <span>추이 예측 및 나이대 파악</span>
                  </div>
                </div><div style={cellStyle}>
                  <img style={gifStyle} src={Third} alt="gif" />
                  <span style={titleStyle}>CCTV 영상 분석</span>
                  <div style={cellPStyle}>
                    <span>영상 분석을 통해</span>
                    <span>이상행동 및 인구밀집도 파악</span>
                  </div>
                </div><div style={cellStyle}>
                  <img style={gifStyle} src={Fourth} alt="gif" />
                  <span style={titleStyle}>이상행동 탐지 및 알림</span>
                  <div style={cellPStyle}>
                    <span>실시간 영상을 업로드하면</span>
                    <span>이상행동 탐지 및 알림</span>
                  </div>
                </div><div style={cellStyle}>
                  <img style={gifStyle} src={Fifth} alt="gif" />
                  <span style={titleStyle}>대응 가이드 추천</span>
                  <div style={cellPStyle}>
                    <span>LLM을 이용해</span>
                    <span>장소와 상황에 맞는 대응 가이드 제안</span>
                  </div>
                </div><div style={cellStyle}>
                  <img style={gifStyle} src={Sixth} alt="gif" />
                  <span style={titleStyle}>위험 상황에 빠른 대응</span>
                  <div style={cellPStyle}>
                    <span>이상행동 및 혼잡도 발생 시</span>
                    <span>알맞은 대응 방안 제공</span>
                  </div>
                </div>
              </div>
             
            </motion.div>
          </>
        );
  }
  
  export default Page2;
