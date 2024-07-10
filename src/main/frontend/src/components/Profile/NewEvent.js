import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button
    } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomTextField from '../Styles/CustomTextField.js';

const NewEvent = ({ open, onClose, onAddEvent }) => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [startdate, setStartdate] = React.useState(null);
    const [enddate, setEnddate] = useState(null);

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
    const onSubmit = (data) => {
        if (validateDates()) {
            onAddEvent(data.title); // 'title' 필드의 값을 전달
            onClose();
        }
    };

    // Date Picker 스타일 적용
    const dateStyles = {
        backgroundColor : "#323D4E",
        marginBottom: '23px', // DatePicker 입력칸 사이의 간격 추가
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#CFCFCF1D', // 기본 테두리 색상
            },
            '&:hover fieldset': {
                borderColor: '#CFCFCF1D', // 호버 시 테두리 색상
            },
            '&.Mui-focused fieldset': {
                borderColor: '#CFCFCF1D', // 포커스 시 테두리 색상
                borderWidth: '2px', // 포커스 시 테두리 두께
            },
        },
        width: '370px',
        height: '56px',
    }

    // 스크롤 안 보이게
    const noScrollbarStyles = {
        '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, and Opera
        },
        '-ms-overflow-style': 'none',  // Internet Explorer 10+
        'scrollbar-width': 'none'  // Firefox
    };

    // 페이지 디자인
    const formSx = {
        background: '#273142',
        borderRadius: "12px",
    }

    const dialogContentSx = {
        ...noScrollbarStyles, // 스크롤 바 숨기기 스타일 추가
        maxHeight: '400px', // 필요에 따라 최대 높이 설정
        overflowY: 'auto', // 세로 스크롤 활성화
    };

    // inputProps 스타일 지정
    const inputPropsStyles = {
        overflow: 'hidden',
        resize: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: formSx,
            }}
            >
            <DialogTitle>행사 추가</DialogTitle>
            <DialogContent sx={dialogContentSx}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h5>* 필수 입력 사항 </h5>
                </div>
                <div>  {/* 행사명 */}
                    <CustomTextField
                        label="행사명"
                        id="title"
                        {...register("title", { required: "행사명을 입력해주세요." })}
                        inputProps={{ maxLength: 100 }}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        style={{ marginBottom: errors.title ? '15px' : '23px' }}
                    />
                </div>
                <div>  {/* 행사 시작 날짜 */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort:'M'}}>
                        <DatePicker
                            label="행사 시작 날짜"
                            value={startdate}
                            onChange={(newValue) => {
                                setStartdate(newValue);
                                if (newValue) clearErrors('startdate');
                            }}
                            sx = {dateStyles}
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'day']}
                            renderInput={(params) =>
                                <CustomTextField 
                                        {...params} 
                                        error={!!errors.startdate}
                                        helperText={errors.startdate?.message} 
                                    />
                            }
                        />
                    </LocalizationProvider>
                </div>
                <div>  {/* 행사 종료 날짜 */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort:'M'}}>
                        <DatePicker
                            label="행사 종료 날짜"
                            value={enddate}
                            onChange={(newValue) => {
                                setEnddate(newValue);
                                if (newValue) clearErrors('enddate');
                            }}
                            sx = {dateStyles}
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'day']}
                            renderInput={(params) =>
                                <CustomTextField 
                                        {...params} 
                                        error={!!errors.enddate}
                                        helperText={errors.enddate?.message} 
                                    />
                            }
                        />
                    </LocalizationProvider>
                </div>
                <div>  {/* 지역 - 구 */}
                    <CustomTextField
                        label="지역 - 구"
                        id="gu"
                        {...register("gu", { required: "지역(구)을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.gu}
                        helperText={errors.gu?.message}
                        style={{ marginBottom: errors.gu ? '15px' : '23px' }}
                    />
                </div>
                <div>  {/* 지역 - 동 */}
                    <CustomTextField
                        label="지역 - 동"
                        id="dong"
                        {...register("dong", { required: "지역(동)을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.dong}
                        helperText={errors.dong?.message}
                        style={{ marginBottom: errors.dong ? '15px' : '23px' }}
                    />
                </div>
                <div>
                    <h5>* 선택 입력 사항 </h5>
                </div>
                <div>  {/* 설계도 이미지(url) */}
                    <CustomTextField
                        label="설계도 이미지(url)"
                        id="map_url"
                        {...register("map_url")}
                        error={!!errors.map_url}
                        helperText={errors.map_url?.message}
                        style={{ marginBottom: errors.map_url ? '0px' : '23px' }}
                    />
                </div>
                <div>  {/* 설계도 특징 */}
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
                </div>
                <div>  {/* 사건 내용 */}
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
                </div>
                <div>  {/* 역할 */}
                    <CustomTextField
                        label="역할"
                        id="acc_role"
                        {...register("acc_role")}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.acc_role}
                        helperText={errors.acc_role?.message}
                        style={{ marginBottom: errors.acc_role ? '0px' : '23px' }}
                    />
                </div>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        취소
                    </Button>
                    <Button type='submit' color="primary">
                        확인
                    </Button>
                </DialogActions>
            </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewEvent;
