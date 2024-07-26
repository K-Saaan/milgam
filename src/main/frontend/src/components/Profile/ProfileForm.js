import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import axiosRetry from 'axios-retry';
import { Grid, Select, MenuItem, FormControl, IconButton, Skeleton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { CustomTypographyWrapper, CustomTypography } from './CustomTypo';
import NewEvent from './NewEvent';
import LongButton from "../Styles/LongButton.js";

axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

const noScrollbarStyles = {
    '&::WebkitScrollbar': {
        display: 'none', // Chrome, Safari, and Opera
    },
    'msOverflowStyle': 'none',  // Internet Explorer 10+
    'scrollbarWidth': 'none'  // Firefox
};

const formSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    height: '65vh',
    width: '70%',
    overflow: 'auto',
    ...noScrollbarStyles
};

// 행사 선택 select box 스타일
const EventControl = styled(FormControl)(({ theme }) => ({
    width: '75%',
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

/**
 * 1. ClassName: ProfileForm
 * 2. FileName : ProfileForm.js
 * 3. Package  : components.ProfileForm
 * 4. Comment  : 프로필 화면
 * 5. 작성자   : seungwon
 * 6. 작성일    : 2024. 07. 16
 **/
const ProfileForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [eventTitles, setEventTitles] = useState([]);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [event, setEvent] = useState('');
    const [customEvents, setCustomEvents] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        id: '',
        email: '',
        phone: '',
        org: '',
        event: '',
    });

    const from = location.state?.from || "/dashboard"; // 이전 위치 저장
    const onNextClick = () => {    // 이전 페이지로 이동하도록
        navigate(from);
    };

    // 드롭박스에서 이벤트 선택
    const handleEventChange = (event) => { 
        setEvent(event.target.value);
        if (event.target.value === 'add-new') {
            setDialogOpen(true);
        }
    };

    // 직접 입력된 이벤트 생성
    const handleAddEvent = (newEvent) => {
        if (newEvent && !customEvents.includes(newEvent)) {
            setCustomEvents([...customEvents, newEvent]);
            setEvent(newEvent);
        }
        setDialogOpen(false);
    };

    // 직접 입력 후 생성된 이벤트 삭제
    const handleDeleteEvent = (eventToDelete) => {
        setCustomEvents(customEvents.filter(event => event !== eventToDelete));
        if (event === eventToDelete) {
            setEvent('');
        }
    };

    /**
     * 1. MethodName: getData
     * 2. ClassName : ProfileForm
     * 3. Comment   : DB에서 이벤트 리스트 받아와 드롭박스에 생성
     * 4. 작성자    : seungwon
     * 5. 작성일    : 2024. 07. 16
     **/
    useEffect(() => {
        const getData = async () => {
            console.log('Fetching event data...');
            try {
                const res = await axios.get('/event/eventlist');
                console.log('Response received:', res);
                const titles = res.data.map(event => event.title);
                console.log('Event titles:', titles);
                setEventTitles(titles);  // 상태 업데이트
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        getData();
    }, []);  // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행됨

    /**
     * 1. MethodName: fetchProfile
     * 2. ClassName : ProfileForm
     * 3. Comment   : 로그인 된 회원의 정보를 DB에서 가져와 띄움
     * 4. 작성자    : seungwon
     * 5. 작성일    : 2024. 07. 16
     **/
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/login/profile');
                setProfile({
                    name: response.data.name,
                    id: response.data.id,
                    email: response.data.email,
                    phone: response.data.phone,
                    org: response.data.org,
                    event: response.data.event
                });
                setEvent(response.data.event);
                console.log('Profile fetched:', response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, []);  // 프로필 데이터 로드

    return (
        <Grid
            container
            component="form"
            spacing={0}
            noValidate
            autoComplete="off"
            sx={formSx}
        >
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:5 }}> {/* 이름 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        이름
                    </div>
                    <CustomTypographyWrapper>
                        {isLoadingProfile ? (
                        <Skeleton width={200} height={30} />
                        ) : (
                        <CustomTypography variant="h6">
                            {profile.name || 'null'} {/* 서버에서 받은 이름값이나 기본값 */}
                        </CustomTypography>
                        )}
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:5 }}> {/* 아이디 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px' }}>
                        아이디
                    </div>
                    <CustomTypographyWrapper>
                        {isLoadingProfile ? (
                        <Skeleton width={200} height={30} />
                        ) : (
                        <CustomTypography variant="h6">
                        {profile.id || 'null'} {/* 서버에서 받은 아이디값이나 기본값 */}
                        </CustomTypography>
                        )}
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:2, paddingBottom:3 }}> {/* 이메일 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        이메일
                    </div>
                    <CustomTypographyWrapper>
                        {isLoadingProfile ? (
                        <Skeleton width={200} height={30} />
                        ) : (
                        <CustomTypography variant="h6">
                        {profile.email || 'null'} {/* 서버에서 받은 이메일값이나 기본값 */}
                        </CustomTypography>
                        )}
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:2, paddingBottom:3 }}> {/* 전화번호 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        전화번호
                    </div>
                    <CustomTypographyWrapper>
                        {isLoadingProfile ? (
                        <Skeleton width={200} height={30} />
                        ) : (
                        <CustomTypography variant="h6">
                        {profile.phone || 'null'} {/* 서버에서 받은 전화번호값이나 기본값 */}
                        </CustomTypography>
                        )}
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:6 }}> {/* 소속 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        소속
                    </div>
                    <CustomTypographyWrapper>
                        {isLoadingProfile ? (
                        <Skeleton width={200} height={30} />
                        ) : (
                        <CustomTypography variant="h6">
                        {profile.org || 'null'} {/* 서버에서 받은 소속값이나 기본값 */}
                        </CustomTypography>
                        )}
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:6 }}> {/* 행사 선택 */}
                <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                    행사
                </div>
                <EventControl fullWidth>
                    <Select
                        value={event}
                        onChange={handleEventChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                              return <em>선택</em>;
                            }
                            return selected;
                          }}
                    >
                        {eventTitles.map((title, index) => (
                            <MenuItem
                                key={index}
                                value={title}
                            >
                                {title}
                            </MenuItem>
                        ))}
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
                                        e.stopPropagation(); // 이벤트 버블링을 중지하여 상위 컴포넌트의 onClick이 호출되지 않도록 함
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
            <Grid item xs={12} display={{ md: 'flex' }} justifyContent={{ md: 'center'}} sx={{paddingBottom:5}}>
                <LongButton type="submit" variant="contained" onClick={onNextClick} sx={{marginTop: 0}}>완료</LongButton> {/* 기존 페이지로 돌아감 */}
            </Grid>
            <NewEvent open={dialogOpen} onClose={() => setDialogOpen(false)} onAddEvent={handleAddEvent} /> {/* NewEvent 팝업창 열림 */}
        </Grid>
    );
};

export default ProfileForm;