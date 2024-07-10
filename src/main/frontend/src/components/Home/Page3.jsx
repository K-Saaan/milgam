import { useTheme } from "@emotion/react";
import { motion, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";
import pic from "./pic.jpg"
import { useForm } from "react-hook-form";

// conatiner
const cPage1Style = (theme) => ({
  widht:'100%',
  hegiht:'100%',
  // background: theme.palette.comp,
  color : theme.palette.text.primary,
  
});




function Page3(){

  const { register, handleSubmit, formState: { errors }, formState } = useForm();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const onSubmit = async data => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };


  const Row1 = ({ columns }) => {
    return (
      <>
        {columns.map((column) => (
            <div>
              <span key={column}>{column}</span>
              <input {...register("username", { required: true })} />
            </div>
        ))}
      </>  
    );
  };

  // ############################################################################################

  const columns = ['id', 'pw', 'name', 'email', 'phone', 'role_index', 'apply_date', 'account_lock', 'last_login', 'start_date', 'end_date']; 

  const theme = useTheme();
  const pageStyle = cPage1Style(theme);

  

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
              <form onSubmit={handleSubmit(onSubmit)}>

                <Row1 columns={columns} />
              </form>

            </motion.div>
          </>
        );
  }
  
  export default Page3;