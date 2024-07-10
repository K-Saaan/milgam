import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Grid, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { CustomTypographyWrapper, CustomTypography } from './CustomTypo';
import NewEvent from './NewEvent';
import LongButton from "../Styles/LongButton.js";


const ProfileForm = ({ marginBottom }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/dashboard"; // 이전 위치 저장
    const onNextClick = () => {    // 이전 페이지로 이동하도록
        navigate(from);
    };

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '75vh',
        overflow: 'auto', // 스크롤 활성화
        ...noScrollbarStyles // 스크롤 바 숨기기 스타일 추가
    };

    // 이벤트
    const [event, setEvent] = useState('');
    const [customEvents, setCustomEvents] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEventChange = (event) => { // 이벤트 선택
        const value = event.target.value;
        if (value === 'add-new') {
            setDialogOpen(true);
        } else {
            setEvent(value);
        }
    };

    const handleAddEvent = (newEvent) => { // 직접 입력된 이벤트 생성
        if (newEvent && !customEvents.includes(newEvent)) {
            setCustomEvents([...customEvents, newEvent]);
            setEvent(newEvent);
        }
        setDialogOpen(false);
    };

    const handleDeleteEvent = (eventToDelete) => { // 직접 입력 후 생성된 이벤트 삭제
        setCustomEvents(customEvents.filter(event => event !== eventToDelete));
        if (event === eventToDelete) {
            setEvent('');
        }
    };

    // 행사 선택 select box 스타일
    const EventControl = styled(FormControl)(({ theme }) => ({
        width: '370px',
        height: '56px',
        backgroundColor: theme.palette.secondary.main,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.border.primary,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.border.primary,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.border.secondary,
                borderWidth: '2px',
            },
        },
    }));


    return (
        <Grid
            container
            component="form"
            spacing={3}
            noValidate
            autoComplete="off"
            sx={formSx}
        >
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 이름 */}
                <div>
                    <div style={{ marginBottom: '4px' }}>
                        이름
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                            홍길동 {/* 저장된 이름값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 아이디 */}
                <div>
                    <div style={{ marginBottom: '4px' }}>
                        아이디
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                            abcd1234 {/* 저장된 아이디값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 이메일 */}
                <div>
                    <div style={{ marginBottom: '4px' }}>
                        이메일
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                            abcd1234@naver.com {/* 저장된 이메일값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 전화번호 */}
                <div>
                    <div style={{ marginBottom: '4px' }}>
                        전화번호
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                            010-0000-0000 {/* 저장된 전화번호값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 소속 */}
                <div>
                    <div style={{ marginBottom: '4px' }}>
                        소속
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                            청와대 {/* 저장된 소속값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2 }}> {/* 행사 선택 */}
                <div style={{ marginBottom: '4px' }}>
                    행사
                </div>
                <EventControl
                    fullWidth
                    // sx={selectStyles}
                >
                    <Select
                        value={event}
                        onChange={handleEventChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected || selected.length === 0) {
                                return <em>선택</em>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="" disabled>
                            <em>선택</em>
                        </MenuItem>
                        <MenuItem value="event1">Event 1</MenuItem>
                        <MenuItem value="event2">Event 2</MenuItem>
                        {customEvents.map((customEvent, index) => ( // 직접 입력된 행사명 생성 및 삭제
                            <MenuItem
                                key={index}
                                value={customEvent}
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {customEvent}
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteEvent(customEvent);
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </MenuItem>
                        ))}
                        <MenuItem value="add-new">직접 입력</MenuItem>
                    </Select>
                </EventControl>
            </Grid>
            <Grid item xs={12} display={{ md: 'flex' }} justifyContent={{ md: 'center' }}>
                <LongButton type="submit" variant="contained" onClick={onNextClick}>완료</LongButton> {/* 기존 페이지로 돌아감 */}
            </Grid>
            <NewEvent open={dialogOpen} onClose={() => setDialogOpen(false)} onAddEvent={handleAddEvent} /> {/* NewEvent 팝업창 열림 */}
        </Grid>
    );
};

export default ProfileForm;