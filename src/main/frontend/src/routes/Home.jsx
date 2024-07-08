import { useTheme } from "@emotion/react";
import Page1 from "../components/Home/Page1";
import Page3 from "../components/Home/Page3";
import Page2 from "../components/Home/Page2";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";


//container
const cPageStyle = (theme) => ({
  scrollSnapType: 'y mandatory',
  overflowY: 'scroll',
  height: '100%',
  scrollbarWidth:'none',
});

//content
const cContentStyle = (theme) => ({
  scrollSnapAlign: 'start',
  height: '100%',
  width: '70vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
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
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



    return (
        <>
          <div style={pageStyle} ref={ref}>
            <div style={contentStyle}>
              <Page1/>
            </div>
            <div style={contentStyle}>
              <Page2/>
            </div>
            <div style={contentStyle}>
              <Page3/>
            </div>
            <motion.div  style={{ scaleX, ...pBarStyle }} />
          </div>
        </>
      );
}

export default Home;
