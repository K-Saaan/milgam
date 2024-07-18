import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { cPage1Style } from "./Page1";
import First from "./tech_images/01.png"
import Second from "./tech_images/02.png"
import Third from "./tech_images/03.png"
import Fourth from "./tech_images/04.png"
import Fifth from "./tech_images/05.png"
import Sixth from "./tech_images/06.png"
import Seventh from "./tech_images/07.png"
import Eighth from "./tech_images/08.png";
import Ninth from "./tech_images/09.png";
import Tenth from "./tech_images/10.png";
import Eleventh from "./tech_images/11.png";
import Twelfth from "./tech_images/12.png";
import Thirteenth from "./tech_images/13.png";
import Fourteenth from "./tech_images/14.png";
import Fifteenth from "./tech_images/15.png";

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)', 
  gap: '65px',
  justifyContent: 'center',
  alignItems: 'center', 
};

const cPngStyle = (theme) => ({
  width: 'auto%', 
  height: '100%', 
  objectFit: 'contain', 
})

// mainTitle
export const cMainTitleStyle = (theme) => ({
  display: "flex",
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  fontSize:'2.5rem',
  fontWeight: 800,
  marginBottom: '150px'
});

const cCellStyle = (theme) => ({
  backgroundColor: 'transparent', // 튀는 색상으로 설정
  width: '180px',
  height: '90px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
});

function Page3(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const pngStyle = cPngStyle(theme);
  const mainTitleStyle = cMainTitleStyle(theme);
  const cellStyle = cCellStyle(theme);
  const ref = useRef(null);
  
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
              <div>
                <div style={mainTitleStyle}>
                  <span>
                  다음과 같은 기술을 활용했습니다
                  </span>
                </div>
                  
                <div style={containerStyle}>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={First} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Second} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Third} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Fourth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={{width:'100%', height:'auto',objectFit: 'contain'}} src={Fifth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Sixth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Seventh} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Eighth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Ninth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Tenth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Eleventh} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Twelfth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Thirteenth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={{width:'100%', height:'auto',objectFit: 'contain'}} src={Fourteenth} alt="png" />
                  </div>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={Fifteenth} alt="png" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );
      }
  
  export default Page3;