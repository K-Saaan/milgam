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

// span
const cSpanStyle = (theme) => ({
  margin: '0',
  color: 'red',
  left: '10%',
  fontSize: '56px',
  fontWeight: '700',
  letterSpacing: '-3px',
  lineHeight: '1.2',
  position: 'relative',
});

// text
const cTextStyle = (theme) => ({
  paddingRight:'12px',
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

              <span style={spanStyle}>#003</span>

              <div style={{...textStyle, y}}>
               
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
                  rhoncus quam.
                  Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
                  imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
                  Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
                  blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
                  ipsum tellus, eu tincidunt neque tincidunt a.
            
              </div>

              <img style={picStyle} src={pic} alt="giyomi" />


            </motion.div>
          </>
        );
  }
  
  export default Page3;