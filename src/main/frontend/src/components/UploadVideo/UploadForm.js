import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadForm.css";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import LongButton from "../Styles/LongButton.js";


const UploadForm = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);

    const [isActive, setActive] = useState(false)
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    const handleOnChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            e.target.value = null;
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('video/')) {
                setSelectedFile(file);
            } else {
                alert("영상 파일만 업로드할 수 있습니다.");
            }
        }
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const removeFile = (e) => {
        e.preventDefault();
        setSelectedFile(null);
    };

    const handleSubmit = (e) => {
        if (selectedFile) {
            /*파일 전송이 들어가야 함*/
            console.log("File submitted:", selectedFile);
            /*경로 설정 필요*/
            navigate("/");
            e.preventDefault();
        } else {
            alert("파일을 선택해주세요.");
        }
    };

    return (
        <div className="upload-bg">
            <form className={`upload-form${isActive ? ' active' : ''}`}
                onSubmit={handleSubmit}
                onDragEnter={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragEnd}
                onDrop={handleDrop}
            >
                <input type="file" accept="video/*"
                    style={{display:"none"}}
                    ref={inputRef} onChange={handleOnChange}
                />
                {!selectedFile && <button className="file-btn" onClick={onChooseFile}>
                    <span><CloudUploadRoundedIcon/></span>
                    분석할 영상을 선택해주세요.
                </button>}

                {selectedFile && <div>
                    <div className="selected-file">
                        <p>{selectedFile.name}</p>
                        <button onClick={removeFile}>
                            <DeleteForeverOutlinedIcon/>
                        </button>
                    </div>
                    <LongButton type="submit">분석</LongButton>
                </div>}
            </form>
        </div>
    );
}

export default UploadForm;