import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomTypographyWrapper, CustomTypography } from './CustomTypo';
import NextButton from "../SignUp/NextButton.js";
import { Grid, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NewEvent from './NewEvent';
import { useTheme } from '@mui/material/styles';


const ProfileForm = ({ marginBottom }) => {
    const theme = useTheme();

    // 페이지 이동 부분 const
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    const onNextClick = () => {    // 대시보드 페이지로 이동하도록
        navigate('/dashboard');
    };

    // 페이지 디자인 const
    const formSx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '75vh',
        overflow: 'auto', // 스크롤 활성화
    };

    // 이벤트 부분 const
    const [event, setEvent] = useState('');
    const [customEvents, setCustomEvents] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEventChange = (event) => {
        const value = event.target.value;
        if (value === 'add-new') {
            setDialogOpen(true);
        } else {
            setEvent(value);
        }
    };

    const handleAddEvent = (newEvent) => {
        if (newEvent && !customEvents.includes(newEvent)) {
            setCustomEvents([...customEvents, newEvent]);
            setEvent(newEvent);
        }
        setDialogOpen(false);
    };

    const handleDeleteEvent = (eventToDelete) => {
        setCustomEvents(customEvents.filter(event => event !== eventToDelete));
        if (event === eventToDelete) {
            setEvent('');
        }
    };


    return (
        <Grid
            container
            component="form"
            spacing={3}
            noValidate
            autoComplete="off"
            sx={formSx}
        >
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
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
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <div style={{ marginBottom: '4px' }}>
                    이벤트
                </div>
                <FormControl fullWidth>
                    {/* <InputLabel id="event-label">이벤트</InputLabel> */}
                    <Select
                        // labelId="event-label"
                        // id="event"
                        value={event}
                        onChange={handleEventChange}
                        displayEmpty
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>선택</em>;
                                }
                                return selected;
                            }}
                        label="이벤트"
                        sx={{
                            backgroundColor: theme.palette.secondary.main, color: theme.palette.text.primary,
                            width: "370px"
                        }}
                    >
                        <MenuItem value="event1">Event 1</MenuItem>
                        <MenuItem value="event2">Event 2</MenuItem>
                        {customEvents.map((customEvent, index) => (
                            <MenuItem key={index} value={customEvent}>
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
                </FormControl>
            </Grid>
            <Grid item xs={12} display={{ md: 'flex' }} justifyContent={{ md: 'center' }}>
                <NextButton type="submit" onClick={onNextClick}>완료</NextButton>
            </Grid>
            <NewEvent open={dialogOpen} onClose={() => setDialogOpen(false)} onAddEvent={handleAddEvent} />
        </Grid>
    );
};

export default ProfileForm;