import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./UploadForm.css";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import LongButton from "../Styles/LongButton.js";
import CustomTextField from "../Styles/CustomTextField.js";


const UploadForm = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const { register, handleSubmit } = useForm();

    const [isActive, setActive] = useState(false)
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);

    // 파일 선택
    const handleOnChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            e.target.value = null;
        }
    };
    // 드래그 앤 드롭 처리
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
    // 클릭으로 파일 업로드 처리
    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    // 파일 선택 취소
    const removeFile = (e) => {
        e.preventDefault();
        setSelectedFile(null);
    };
    // 파일 전송 처리
    const onHSubmit = (data) => {
        if (selectedFile) {
            /*파일 전송이 들어가야 함*/
            navigate("/videoresult", { state: { video: selectedFile, detail: data.detail } });
        } else {
            alert("파일을 선택해주세요.");
        }
    };
    // 영상 내용 기입란에서 엔터 처리
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(onHSubmit)();
        }
    };

    return (
        <div className="upload-bg">
            {/* 입력 폼 처리 */}
            <form className={`upload-form${isActive ? ' active' : ''}`}
                onSubmit={handleSubmit(onHSubmit)}
                onDragEnter={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragEnd}
                onDrop={handleDrop}
            >
                {/* 파일 입력 부분. 스타일은 숨겨져있음. 비디오형식만 */}
                <input type="file" accept="video/*"
                    style={{display:"none"}}
                    ref={inputRef} onChange={handleOnChange}
                />
                {/* 선택 파일이 없을 때 나타남 */}
                {!selectedFile && <button className="file-btn" onClick={onChooseFile}>
                    <span><CloudUploadRoundedIcon/></span>
                    분석할 영상을 선택해주세요.
                </button>}
                {/* 선택한 파일이 있을 때 나타남 */}
                {selectedFile && <div className="upload-bg">
                    {/* 파일 명, 선택 취소 */}
                    <div className="selected-file">
                        <p>{selectedFile.name}</p>
                        <button onClick={removeFile}>
                            <DeleteForeverOutlinedIcon/>
                        </button>
                    </div>
                    {/* 영상 내용 선택적 기입란 */}
                    <div>
                        <CustomTextField
                            id="detail" placeholder="영상 내용을 기입해주세요(선택)"
                            {...register("detail")}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    {/* 분석 결과로 이동하는 버튼 */}
                    <LongButton type="submit" style={{marginTop:"40px"}}>분석</LongButton>
                </div>}
            </form>
        </div>
    );
}

export default UploadForm;