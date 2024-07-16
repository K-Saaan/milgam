import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";

// conatiner
export const cPage1Style = (theme) => ({
  widht:'100%',
  hegiht:'100%',
  // background: theme.palette.comp,
  color : theme.palette.text.primary,
});

// span
export const cSpanStyle = (theme) => ({
  margin: '0',
  color: theme.palette.primary.main,
  left: '10%',
  fontSize: '56px',
  fontWeight: '700',
  letterSpacing: '-3px',
  lineHeight: '1.2',
  position: 'relative',
});

// text
export const cTextStyle = (theme) => ({
  paddingRight:'12px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
});

// picture
export const cPicStyle = (theme) => ({
  width: '250px',
  height: '250px',
  borderRadius: '10px',
});

function Page1(){

  function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  
      return (
          <>
            <div >
              <video loop autoPlay muted style={{width:'100vw', zIndex:'3'}}>
                  <source src="https://videos.pexels.com/video-files/16476078/16476078-uhd_2560_1440_30fps.mp4" type="video/mp4" />
              </video>
              <p style={{color:'white', position:'relative', top:'-550px', paddingLeft:'100px', fontSize:'40px', fontWeight:'800', zIndex:'1'}}>
                AI를 활용한 크라우드 매니지먼트<br/>
                단 하나의 솔루션, 밀감
              </p>
            </div>
          </>
        );
  }
  
  export default Page1;