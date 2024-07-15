import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import LongButton from "../Styles/LongButton.js";
import CustomTextField from "../Styles/CustomTextField.js";


// mui system을 사용한 코드
import { styled } from '@mui/system';

const UploadBG = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "65vh",
    flexDirection: "column",
  });

  const UploadFormContainer = styled('form')({
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    width: "350px",
    margin: "50px",
  });

  const FileButton = styled('button')(({ theme }) => ({
    width: '100%',
    height: '200px',
    fontSize: '18px',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.text.primary,
    },
  }));

  const FileButtonSpan = styled('span')(({ theme }) => ({
    width: '50px',
    height: '50px',
    fontSize: '30px',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
    backgroundColor: theme.palette.primary.main,
  }));

  const SelectedFileContainer = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${theme.palette.primary.main}2D`,
    border: `1px solid ${theme.palette.primary.main}5D`,
    borderRadius: '5px',
    marginBottom: '5px',
  }));

  const SelectedFileP = styled('p')({
    fontSize: '13px',
    fontWeight: 500,
    marginLeft: '15px',
  });

  const SelectedFileButton = styled('button')(({ theme }) => ({
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main,
    },
  }));

  const UploadForm = ({ onUploadSuccess }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const { register, handleSubmit } = useForm();

    const [error, setError] = useState('');
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
    const onHSubmit = async (data) => {
      if (selectedFile) {
        try {
          // 파일 자르기
          const chunkSize = 1024 * 1024; // 1MB
          const totalChunks = Math.ceil(selectedFile.size / chunkSize);

          //선택한 영상을 chunk 단위로 잘라서 하나씩 서버로 보냄
          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(selectedFile.size, start + chunkSize);
            const chunk = selectedFile.slice(start, end);

            const formData = new FormData();
            formData.append('chunkFile', chunk);
            formData.append('chunkIndex', i);
            formData.append('totalChunks', totalChunks);

            await axios.post('/api/videoUpload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }

          navigate("/videoresult", { state: { video: selectedFile, detail: data.detail } });
        } catch (error) {
          console.error('업로드 실패. 에러가 발생하였습니다.', error);
          setError('업로드 실패. 에러가 발생하였습니다.');
        }
      } else {
        setError("파일을 선택해주세요.");
      }
    };

    // 영상 내용 기입란에서 엔터 처리
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(onHSubmit)();
      }
    };

    return (
      <UploadBG>
        {/* 입력 폼 처리 */}
        <UploadFormContainer
          isActive={isActive}
          onSubmit={handleSubmit(onHSubmit)}
          onDragEnter={handleDragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleOnChange}
          />
          {/* 선택 파일이 없을 때 나타남 */}
          {!selectedFile && (
            <FileButton onClick={onChooseFile}>
              <FileButtonSpan>
                <CloudUploadRoundedIcon />
              </FileButtonSpan>
              분석할 영상을 선택해주세요.
            </FileButton>
          )}
          {/* 선택한 파일이 있을 때 나타남 */}
          {selectedFile && (
            <UploadBG>
              {/* 파일 명, 선택 취소 */}
              <SelectedFileContainer>
                <SelectedFileP>{selectedFile.name}</SelectedFileP>
                <SelectedFileButton onClick={removeFile}>
                  <DeleteForeverOutlinedIcon />
                </SelectedFileButton>
              </SelectedFileContainer>
              {/* 영상 내용 선택적 기입란 */}
              <div>
                <CustomTextField
                  id="detail"
                  placeholder="영상 내용을 기입해주세요(선택)"
                  {...register("detail")}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {/* 분석 결과로 이동하는 버튼 */}
              <LongButton variant="contained" type="submit" style={{ marginTop: "40px" }}>
                분석
              </LongButton>
              <div style={{color: theme.palette.warn}}>{error}</div>
            </UploadBG>
          )}
        </UploadFormContainer>
      </UploadBG>
    );
  }

  export default UploadForm;