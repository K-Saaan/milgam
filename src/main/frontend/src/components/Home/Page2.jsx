import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import pic from "./pic2.jpg"
import { useRef } from "react";
import { cPage1Style, cPicStyle, cSpanStyle, cTextStyle } from "./Page1";



function Page2(){

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

              <span style={spanStyle}>#002</span>

              <div style={{...textStyle, y}}>
               
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
                  rhoncus quam. 짜쟌~ 우리 밀감이는요
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
  
  export default Page2;