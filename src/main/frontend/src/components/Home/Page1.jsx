import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import pic from "./pic.jpg"
import { useRef } from "react";

// conatiner
export const cPage1Style = (theme) => ({
  widht:'100%',
  hegiht:'100%',
  // background: theme.palette.comp,
  color : theme.palette.text.primary,
  display:'flex',
  
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

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const spanStyle = cSpanStyle(theme);
  const picStyle = cPicStyle(theme);
  const textStyle = cTextStyle(theme);

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

              <span style={spanStyle}>#001</span>

              <div style={{...textStyle, y}}>
               
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
                  rhoncus quam. 대강 문제상황 우리서비스를써야하는그런거설득
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
  
  export default Page1;