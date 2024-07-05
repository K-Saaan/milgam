import UploadForm from "../components/UploadVideo/UploadForm.js";
import Background from "../components/Background"


function UploadVideo(){
    return (
        <>
            <Background name={"영상 업로드"} contents={<UploadForm />}/>
        </>
      );
}

export default UploadVideo;