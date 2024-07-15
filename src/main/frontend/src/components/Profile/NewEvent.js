import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Dialog, DialogActions, DialogContent,
    DialogTitle, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import DialogContentText from '@mui/material/DialogContentText';
import CustomTextField from '../Styles/CustomTextField.js';
import CustomDatePicker from '../Styles/CustomDatePicker.js';
import dayjs from 'dayjs';


// 스크롤 안 보이게
const noScrollbarStyles = {
    '&::-webkit-scrollbar': {
        display: 'none', // Chrome, Safari, and Opera
    },
    '-ms-overflow-style': 'none',  // Internet Explorer 10+
    'scrollbar-width': 'none'  // Firefox
};

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


const NewEvent = ({ open, onClose, onAddEvent }) => {
    const theme = useTheme();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, setValue } = useForm();
    const [startdate, setStartdate] = React.useState(null);
    const [enddate, setEnddate] = useState(null);

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

    const makeTimeStamp=(time)=>{
        const dateObject = new Date(time);

        return dateObject.getTime();
    }

    // 폼 제출 핸들러
    const onSubmit = async (data) => {
        if (validateDates()) {
            const eventData = {
                ...data,
                start_date: startdate.toISOString(), // Timestamp로 변환
                end_date: enddate.toISOString() // Timestamp로 변환
            };

            try {
                const response = await axios.post("/event/eventadd", eventData); // 실제 API URL로 대체해야 합니다.
                console.log('이벤트 추가 응답:', response.data);
                onAddEvent(data.title); // 'title' 필드의 값을 전달
                onClose();
            } catch (error) {
                console.error('이벤트 추가 중 오류 발생:', error);
            }
        }


        try{

            setValue('start_date', makeTimeStamp(startdate));
            setValue('end_date', makeTimeStamp(enddate));
            console.log(data)
            console.log('start', startdate)
            console.log('end', enddate)

            const req = axios.post("http://localhost:8080/event/eventadd", data);

            console.log(req)
        }
        catch(e){
            console.log("Retry!")
        }

    };

    // 스크롤 안 보이게
    const noScrollbarStyles = {
        '&::WebkitScrollbar': {
            display: 'none', // Chrome, Safari, and Opera
        },
        'msOverflowStyle': 'none',  // Internet Explorer 10+
        'scrollbar-width': 'none'  // Firefox
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


    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { background: theme.palette.background.paper, width: "50vw",height: "50vw",
                    borderRadius: "12px" },
            }}
        >
            <DialogTitle>행사 추가</DialogTitle>
            <Divider style={{background: theme.palette.divider}} />
            <DialogContent sx={dialogContentSx}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <DialogContentText marginBottom='16px'>* 필수 입력 사항</DialogContentText>
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
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort:'M'}}>
                            <CustomDatePicker
                                label="행사 시작 날짜"
                                value={startdate}
                                onChange={(newValue) => {
                                    setStartdate(newValue);
                                    setValue('start_date', startdate.toISOString().split('T')[0]);
                                    if (newValue) clearErrors('startdate');
                                }}
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
                        </LocalizationProvider> */}

                        <input type='datetime-local' onChange={(e) => setStartdate(e.target.value.toLocaleString())} />
                    </div>
                    <div>  {/* 행사 종료 날짜 */}
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort:'M'}}>
                            <CustomDatePicker
                                label="행사 종료 날짜"
                                value={enddate}
                                onChange={(newValue) => {
                                    setEnddate(newValue);
                                    setValue('end_date', enddate.toISOString().split('T')[0]);
                                    if (newValue) clearErrors('enddate');
                                }}
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
                        </LocalizationProvider> */}
                        <input type='datetime-local' onChange={(e) => setEnddate(e.target.value.toLocaleString())} />

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
                        <DialogContentText marginTop='16px' marginBottom='16px'>* 선택 입력 사항</DialogContentText>
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
