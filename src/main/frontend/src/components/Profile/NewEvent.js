import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogActions, DialogContent,
    DialogTitle, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import CustomTextField from '../Styles/CustomTextField.js';

// 스크롤 안 보이게
const noScrollbarStyles = {
    '&::WebkitScrollbar': {
        display: 'none', // Chrome, Safari, and Opera
    },
    'msOverflowStyle': 'none',  // Internet Explorer 10+
    'scrollbarWidth': 'none'  // Firefox
};

const dialogContentSx = {
    ...noScrollbarStyles, // 스크롤 바 숨기기 스타일 추가
    maxHeight: '1200px', // 필요에 따라 최대 높이 설정
    overflowY: 'auto', // 세로 스크롤 활성화
};

// inputProps 스타일 지정
const inputPropsStyles = {
    overflow: 'hidden',
    resize: 'none',
    '&::WebkitScrollbar': {
        display: 'none',
    },
    'msOverflowStyle': 'none',
    'scrollbarWidth': 'none'
};


const NewEvent = ({ open, onClose, onAddEvent }) => {
    const theme = useTheme();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, setValue } = useForm();
    const [startdate, setStartdate] = useState(null);
    const [enddate, setEnddate] = useState(null);

    // 날짜 선택 Datepicker 스타일
    const datePickerSX = {
        width: '370px',
        height: '56px',
        marginBottom: '23px',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.secondary.main,
            '& fieldset': {
                borderColor: theme.palette.divider,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.divider,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: '2px',
            },
        }
    };
    
    // 날짜 선택 유효성 검사
    const validateDates = () => {
        let valid = true;
        if (!startdate) {
            setError('startdate', { type: 'manual', message: '행사 시작 날짜를 선택해주세요.' });
            valid = false;
        } else {
            clearErrors('startdate');
        }

        if (!enddate) {
            setError('enddate', { type: 'manual', message: '행사 종료 날짜를 선택해주세요.' });
            valid = false;
        } else {
            clearErrors('enddate');
        }

        return valid;
    };

    // 폼 제출 핸들러
    const onSubmit = async (data) => {
        if (!validateDates()) {
            return; // 날짜가 유효하지 않으면 제출 중단
        }
        // ISO 포맷으로 날짜 변환
        const formattedData = {
            ...data,
            start_date: startdate.toISOString(),
            end_date: enddate.toISOString()
        };
        
        console.log('Submitting data:', formattedData);
        
        try {
            const response = await axios.post('/event/eventadd', formattedData);
            console.log('Event added successfully:', response.data);
            onAddEvent(formattedData.title); // 이벤트 목록 업데이트
            onClose(); // 다이얼로그 닫기
        } catch (error) {
            console.error('Error adding event:', error);
            alert('이벤트 추가에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { background: theme.palette.background.paper, borderRadius: "12px" },
            }}
        >
            <DialogTitle>행사 추가</DialogTitle>
            <Divider style={{background: theme.palette.divider}} />
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={dialogContentSx}>
                <DialogContentText marginBottom='16px'>* 필수 입력 사항</DialogContentText>
                {/* 행사명 */}
                <CustomTextField
                    label="행사명"
                    id="title"
                    {...register("title", { required: "행사명을 입력해주세요." })}
                    inputProps={{ maxLength: 100 }}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    style={{ marginBottom: errors.title ? '15px' : '23px' }}
                />
                {/* 행사 시작 날짜 */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="행사 시작 날짜"
                        value={startdate}
                        onChange={setStartdate}
                        sx={datePickerSX}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                error={!!errors.startdate}
                                helperText={errors.startdate?.message}
                                
                            />}
                    />
                </LocalizationProvider>
                {/* 행사 종료 날짜 */} 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="행사 종료 날짜"
                        value={enddate}
                        onChange={setEnddate}
                        sx={datePickerSX}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                error={!!errors.enddate}
                                helperText={errors.enddate?.message}
                                sx={datePickerSX}
                            />}
                    />
                </LocalizationProvider>
                {/* 지역 - 구 */}
                <CustomTextField
                    label="지역 - 구"
                    id="gu"
                    {...register("gu", { required: "지역(구)을 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.gu}
                    helperText={errors.gu?.message}
                    style={{ marginBottom: errors.gu ? '15px' : '23px' }}
                />
                {/* 지역 - 동 */}
                <CustomTextField
                    label="지역 - 동"
                    id="dong"
                    {...register("dong", { required: "지역(동)을 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.dong}
                    helperText={errors.dong?.message}
                    style={{ marginBottom: errors.dong ? '15px' : '23px' }}
                />
                <DialogContentText marginTop='16px' marginBottom='16px'>* 선택 입력 사항</DialogContentText>
                {/* 설계도 이미지(url) */}
                <CustomTextField
                    label="설계도 이미지(url)"
                    id="map_url"
                    {...register("map_url")}
                    error={!!errors.map_url}
                    helperText={errors.map_url?.message}
                    style={{ marginBottom: errors.map_url ? '0px' : '23px' }}
                />
                {/* 설계도 특징 */}
                <CustomTextField
                    label="설계도 특징"
                    id="map_features"
                    {...register("map_features")}
                    error={!!errors.map_features}
                    helperText={errors.map_features?.message}
                    style={{ marginBottom: errors.map_features ? '0px' : '23px' }}
                    multiline
                    rows={3}
                    inputProps={{
                        style: inputPropsStyles
                    }}
                />
                {/* 사건 내용 */}
                <CustomTextField
                    label="사건 내용"
                    id="content"
                    {...register("content")}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    style={{ marginBottom: errors.content ? '0px' : '23px' }}
                    multiline
                    rows={8}
                    inputProps={{
                        style: inputPropsStyles
                    }}
                />
                {/* 역할 */}
                <CustomTextField
                    label="역할"
                    id="acc_role"
                    {...register("acc_role")}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.acc_role}
                    helperText={errors.acc_role?.message}
                    style={{ marginBottom: errors.acc_role ? '0px' : '23px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">취소</Button>
                <Button type='submit' color="primary">확인</Button>
            </DialogActions>
            </form>
        </Dialog>
    );
};

export default NewEvent;
