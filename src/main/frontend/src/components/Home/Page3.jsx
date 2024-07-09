import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import pic from "./pic.jpg"

// conatiner
const cPage1Style = (theme) => ({
  widht:'100%',
  hegiht:'100%',
  // background: theme.palette.comp,
  color : theme.palette.text.primary,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 6열 그리드
  gridTemplateRows: 'repeat(3, auto)',  // 각 열의 높이는 자동으로
  gridGap: '10px',
  gridTemplateAreas: `
    "a . . "
    ". b . "
    ". . c "
  `,
});

const cDivAStyle =(theme) => ({ 
  gridArea: 'a',
  width: '100px',
  height: '100px',
  borderRadius: '10px',
  border: '4px solid red',
  overflow: 'hidden',
  display:'flex',
  justifyContent:'center'
 });

const cDivBStyle = (theme) => ({
  gridArea: 'b',
  width: '100px',
  height: '100px',
  borderRadius: '10px',
  border: '4px solid red',
  overflow: 'hidden',
  display:'flex',
  justifyContent:'center'
 });
 
const cDivCStyle = (theme) => ({
  gridArea: 'c',
  width: '100px',
  height: '100px',
  borderRadius: '10px',
  background: 'red',
  border: '4px solid red',
  overflow: 'hidden',
  display:'flex',
  justifyContent:'center'
 });

const cImgStyle = (theme) => ({
 width: '100px',
 height: '100px',
});



function Page3(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const divAStyle = cDivAStyle(theme);
  const divBStyle = cDivBStyle(theme);
  const divCStyle = cDivCStyle(theme);
  const imgCStyle = cImgStyle(theme);
  

  function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  
      return (
          <>
            <div style={pageStyle}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                    delay:1,
                    ease: "easeInOut",
                    duration: 1,
                    y: { duration: 2.8 },
                }} style={divAStyle}>
                <img style={imgCStyle} src={pic} alt="pic"/>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: -50 }}
                viewport={{ once: false }}
                transition={{
                  delay:2,
                    ease: "easeInOut",
                    duration: 1,
                    y: { duration: 3.8 },
                }} style={divBStyle}>
                    <img style={imgCStyle} src={pic} alt="pic"/>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: -100 }}
                viewport={{ once: false }}
                transition={{
                  delay:3,
                    ease: "easeInOut",
                    duration: 1,
                    y: { duration: 4.8 },
                }} style={divCStyle}>
                <img style={imgCStyle} src={pic} alt="pic"/>
              </motion.div>
            </div>
          </>
        );
  }
  
  export default Page3;