import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import axios from 'axios';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import LongButton from "../Styles/LongButton.js";
import CustomTextField from "../Styles/CustomTextField.js";


// mui system을 사용한 코드
import { styled } from '@mui/system';

const CamInputCont = styled('div')({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  width:'370px',
  paddingLeft:'10px',
  marginTop:"5px",
  marginBottom:'5px'
});

const UploadBG = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "600px",
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
    const { register, handleSubmit, reset, control } = useForm();

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
      reset();
    };

    // 영상 전송
    const uploadFileChunk = async (selectedFile, chunk, index, totalChunks, data) => {
      const formData = new FormData();
      const formattedTime = dayjs(data.time).format('hh:mm a');
      formData.append('originName', selectedFile.name)
      formData.append('chunkFile', chunk);
      formData.append('chunkIndex', index);
      formData.append('totalChunks', totalChunks);
      formData.append('place', data.detail);
      formData.append('time', formattedTime);

      try {
        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
        await axios.post('http://localhost:8080/api/videoUpload', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error(`Chunk ${index} upload failed.`);
      }
    };

    // 메타 데이터 전송
    const uploadMetaData = async (data, file, index) => {
      const vMetaData = new FormData();
      vMetaData.append('length', file.size);
      vMetaData.append('sector', data.sector);
      vMetaData.append('camera_num', data.camera);
      vMetaData.append('content', data.detail);
      vMetaData.append('file_name', file.name);
      vMetaData.append('chunk_index', index);

      try {
        await axios.post('http://localhost:8080/api/uploadmeta', vMetaData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Meta data upload failed.');
      }
    };

    const onHSubmit = async (data) => {
      if (selectedFile) {
        try {
          const chunkSize = 1024 * 1024;
          const totalChunks = Math.ceil(selectedFile.size / chunkSize);

          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(selectedFile.size, start + chunkSize);
            const chunk = selectedFile.slice(start, end);

            // 파일 전송
            uploadFileChunk(selectedFile, chunk, i, totalChunks, data);
            // 메타 데이터 전송
            //uploadMetaData(data, selectedFile, i);
            console.log("chunkIndex", i);
            console.log("totalChunks", totalChunks);
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
    const handleInput = (event) => {
      const value = event.target.value;
      // 비숫자 문자를 모두 제거합니다.
      event.target.value = value.replace(/[^0-9]/g, '');
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
                    <DeleteForeverOutlinedIcon/>
                  </SelectedFileButton>
                </SelectedFileContainer>
                {/* 영상 내용 선택적 기입란 */}
                <CamInputCont>
                  <div>시각</div>
                  <Controller
                      name="time"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                {...field}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        placeholder="영상 촬영 시각을 입력해주세요."
                                    />
                                )}
                                sx={{width: '315px', backgroundColor: theme.palette.secondary.main}}
                            />
                          </LocalizationProvider>
                      )}
                  />
                </CamInputCont>
                <CamInputCont>
                  <div>구역</div>
                  <CustomTextField
                      id="sector"
                      placeholder="구역 번호"
                      {...register("sector")}
                      inputProps={{maxLength: 5}}
                      sx={{width: "120px"}}
                  />
                  <div>카메라</div>
                  <CustomTextField
                      id="camera"
                      placeholder="카메라 번호"
                      sx={{width: "120px"}}
                      {...register("camera")}
                      inputProps={{maxLength: 10}}
                      onInput={handleInput}
                  />
                </CamInputCont>
                <div>
                  <CustomTextField
                      id="detail"
                      placeholder="영상 내용(장소)을 기입해주세요."
                      {...register("detail")}
                      onKeyPress={handleKeyPress}
                  />
                </div>
                {/* 분석 결과로 이동하는 버튼 */}
                <LongButton variant="contained" type="submit" style={{marginTop: "40px"}}>
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