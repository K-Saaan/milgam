import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import { cPage1Style, cSpanStyle } from "./Page1";





function Page4(){

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);
  const spanStyle = cSpanStyle(theme);

  

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


                <span style={spanStyle}>#004</span>
                <video loop autoPlay muted controls width="600">
                  <source src="https://assets.planet.com/web/videos/home/homepage-hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                
              </div>

            </motion.div>
          </>
        );
      }
  
  export default Page4;