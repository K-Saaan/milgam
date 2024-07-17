import { useTheme } from "@emotion/react";
import Page1 from "../components/Home/Page1";
import Page2 from "../components/Home/Page2";
import Page3 from "../components/Home/Page3";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Page4 from "../components/Home/Page4";
import Page5 from "../components/Home/Page5";
import Page6 from "../components/Home/Page6";



//page
const cPageStyle = (theme) => ({
  // scrollSnapType: 'y mandatory',
  overflowY: 'scroll',
  height: '100vh',
  width: '1920px',
  scrollbarWidth:'none',
});

//container
const cCTStyle = (theme) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection: 'column',
  width:'1920px',
});

//content
const cContentStyle = (theme) => ({
  scrollSnapAlign: 'center',
  height: '100vh',
  minHeight: '1080px',
  width:'100vw',
  maxWidth: '1000px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginBottom: '75px', 
});



//progressBar
const cPBarStyle = (theme) => ({
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0px',
  height: '20px',
  background: theme.palette.text.primary,
  transformOrigin: '0%',

});


function Home(){

  const theme = useTheme();
  const pageStyle = cPageStyle(theme);
  const contentStyle = cContentStyle(theme);
  const pBarStyle = cPBarStyle(theme);
  const containerStyle = cCTStyle(theme);
  

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref, layoutEffect: false });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


    return (
        <>



          <div style={pageStyle} ref={ref}>
            <div style={containerStyle}>

              <div style={contentStyle}>
                <Page1 />
              </div>

              <div style={contentStyle}>
                <Page2 />
              </div>

              <div style={contentStyle}>
                <Page3 />
              </div>

              {/* <div style={contentStyle}>
                <Page4 />
              </div> */}

              {/* <div style={contentStyle}>
                <Page5 />
              </div> */}

              {/* <div style={contentStyle}>
                <Page6 />
              </div> */}

           

            <motion.div  style={{ scaleX, ...pBarStyle }} />
            </div>
            
          </div>
        </>
      );
}

export default Home;
