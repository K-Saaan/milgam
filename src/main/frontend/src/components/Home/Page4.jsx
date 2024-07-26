import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { cPage1Style } from "./Page1";
import { cMainTitleStyle } from "./Page3";
import mj from "./team_images/미진-ccut.png"
import bm from "./team_images/병민-ccut.png"
import br from "./team_images/보름-ccut.png"
import by from "./team_images/보영-ccut.png"
import bj from "./team_images/본재-ccut.png"
import san from "./team_images/산-ccut.png"
import sb from "./team_images/상빈-ccut.png"
import sm from "./team_images/수민-ccut.png"
import sw from "./team_images/승원-ccut.png"

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)', 
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center', 
};

const cCellStyle = (theme) => ({
  width: '180px',
  height: '220px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  fontWeight: 600,
});

const cPngStyle = (theme) => ({
  width: 'auto%',
  height: '180px',
  objectFit: 'contain',
  marginBottom: '5px',
})

function Page4(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const cellStyle = cCellStyle(theme);
  const mainTitleStyle = cMainTitleStyle(theme);
  const pngStyle = cPngStyle(theme);


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
                  이런 사람들이 만들었습니다
                  </span>
               </div>
               <div style={containerStyle}>
                  <div style={cellStyle}>
                    <img style={pngStyle} src={san} alt="png" />
                    <span>
                        김산
                    </span>
                  </div>                
                  <div style={cellStyle}>
                    <img style={pngStyle} src={bj} alt="png" />
                    <span>
                        구본재
                    </span>
                  </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={mj} alt="png" />
                    <span>
                        김미진
                    </span>
                  </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={br} alt="png" />
                    <span>
                        박보름
                    </span>
                 </div>  
                  <div style={cellStyle}>
                   <img style={pngStyle} src={by} alt="png" />
                   <span>
                        박보영
                   </span>
                 </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={sw} alt="png" />
                    <span>
                        백승원
                    </span>
                  </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={bm} alt="png" />
                    <span>
                        유병민
                    </span>
                 </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={sb} alt="png" />
                    <span>
                        이상빈
                    </span>
                  </div>  
                  <div style={cellStyle}>
                    <img style={pngStyle} src={sm} alt="png" />
                    <span>
                        이수민
                    </span>
                  </div>  
                </div>  
              </div>
            </motion.div>
          </>
        );
      }
  
  export default Page4;