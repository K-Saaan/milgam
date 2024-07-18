import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { cPage1Style } from "./Page1";
import { cMainTitleStyle } from "./Page3";

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)', 
  gap: '65px',
  justifyContent: 'center',
  alignItems: 'center', 
};

const cCellStyle = (theme) => ({
  backgroundColor: 'red', // 튀는 색상으로 설정
  width: '180px',
  height: '90px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
});

function Page4(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const cellStyle = cCellStyle(theme);
  const mainTitleStyle = cMainTitleStyle(theme);
  


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
                    <span>
                        김산
                    </span>  
                  </div>                
                  <div style={cellStyle}>
                    <span>
                        구본재
                    </span>  
                  </div>  
                  <div style={cellStyle}>
                    <span>
                        김미진
                    </span>  
                  </div>  
                  <div style={cellStyle}>
                    <span>
                        박보름
                    </span>  
                 </div>  
                  <div style={cellStyle}>
                   <span>
                      박보영
                    </span>  
                 </div>  
                  <div style={cellStyle}>
                    <span>
                        백승원
                    </span>  
                  </div>  
                  <div style={cellStyle}>
                    <span>
                        유병민
                    </span>  
                 </div>  
                  <div style={cellStyle}>
                    <span>
                        이상빈
                    </span>  
                  </div>  
                  <div style={cellStyle}>
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