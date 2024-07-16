import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Grid, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { CustomTypographyWrapper, CustomTypography } from './CustomTypo';
import NewEvent from './NewEvent';
import LongButton from "../Styles/LongButton.js";

// 스크롤 안 보이게
const noScrollbarStyles = {
    '&::WebkitScrollbar': {
        display: 'none', // Chrome, Safari, and Opera
    },
    'msOverflowStyle': 'none',  // Internet Explorer 10+
    'scrollbarWidth': 'none'  // Firefox
};

// 페이지 디자인
const formSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    height: '65vh',
    width: '70%',
    overflow: 'auto', // 스크롤 활성화
    ...noScrollbarStyles // 스크롤 바 숨기기 스타일 추가
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

const ProfileForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/dashboard"; // 이전 위치 저장
    const onNextClick = () => {    // 이전 페이지로 이동하도록
        navigate(from);
    };

    // delete하기
    // const deleteData = async(id) => {
    //     const del = axios.delete(`http://localhost:8080/event/delete/${id}`)
    //     console.log(del)
    // }
    // const getData = async () => {
    //     const res = await axios.get('http://localhost:8080/event/eventlist');
    //     console.log("Full response:", res.data);
    // }

    // delete하기
    // const deleteData = async (id) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:8080/event/delete/${id}`);
    //         console.log("Deleted successfully:", response);
    //         // 여기에서 성공적으로 삭제되었을 때 필요한 추가 작업을 수행할 수 있습니다.
    //         // 예를 들어, 상태 업데이트를 통해 UI를 변경할 수 있습니다.
    //     } catch (error) {
    //         console.error("Failed to delete the event:", error);
    //         // 삭제 실패 시 오류 처리 로직
    //     }
    // }

    //event 받아오기
    const [eventTitles, setEventTitles] = useState([]);

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
    

    const [profile, setProfile] = useState({
        name: '',
        id: '',
        email: '',
        phone: '',
        org: '',
        event: '',
    });
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
                console.log('Profile fetched:', response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []);  // 프로필 데이터 로드


    // 이벤트
    const [event, setEvent] = useState('');
    const [customEvents, setCustomEvents] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEventChange = (event) => { // 이벤트 선택
        setEvent(event.target.value);
        if (event.target.value === 'add-new') {
            setDialogOpen(true);
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
                        <CustomTypography variant="h6">
                            {profile.name || 'null'} {/* 서버에서 받은 이름값이나 기본값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:5 }}> {/* 아이디 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px' }}>
                        아이디
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                        {profile.id || 'null'} {/* 서버에서 받은 아이디값이나 기본값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:2, paddingBottom:3 }}> {/* 이메일 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        이메일
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                        {profile.email || 'null'} {/* 서버에서 받은 이메일값이나 기본값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:2, paddingBottom:3 }}> {/* 전화번호 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        전화번호
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                        {profile.phone || 'null'} {/* 서버에서 받은 전화번호값이나 기본값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:6 }}> {/* 소속 */}
                    <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                        소속
                    </div>
                    <CustomTypographyWrapper>
                        <CustomTypography variant="h6">
                        {profile.org || 'null'} {/* 서버에서 받은 소속값이나 기본값 */}
                        </CustomTypography>
                    </CustomTypographyWrapper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mb: 2, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:6 }}> {/* 행사 선택 */}
                <div style={{textAlign: 'left', width:'100%', marginBottom: '4px', marginLeft: '93px'}}>
                    행사
                </div>
                <EventControl fullWidth>
                    <Select
                        value={profile.event}
                        onChange={handleEventChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                              return <em>선택</em>;
                            }
                            return profile.event ? profile.event : selected;
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