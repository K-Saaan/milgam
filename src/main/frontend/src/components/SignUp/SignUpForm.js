import React, {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Typography, DialogActions, Grid, Stack, Divider, IconButton, InputAdornment, MenuItem} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import CustomTextField from '../Styles/CustomTextField.js';
import EmailAlert from './EmailAlert';

// 스크롤 안 보이게
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
    width: '1100px',
    maxWidth: '1100px', // 최대 너비 설정
    minWidth: '1100px', // 최소 너비 설정
    //overflow: 'auto', // 스크롤 활성화
    ...noScrollbarStyles // 스크롤 바 숨기기 스타일 추가
    // flexDirection: 'column', // 요소들을 세로로 정렬
    // maxHeight: 'calc(100vh - 100px)', // 전체 화면에서 일정 높이를 제외한 만큼의 최대 높이 설정
};


const SignUpForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}, setValue, watch, control, trigger} = useForm({
        mode: 'onChange',
    })
    const email = watch('email');

    // Date Picker 스타일 적용
    const dateStyles = {
        width: '215px',
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

    const buttonsx = {
        marginTop: "20px",
        
        padding: '10px',
        backgroundColor: theme.primary,
        color: theme.text,
    }

    // 페이지 이동
    const onSubmit = async (data) => {
        // Clone the data object and remove the repw property
        const {repw, ...dataWithoutRepw} = data;

        // Declare additional variables
        const currentTime = new Date().toISOString();
        const additionalData = {
            account_lock: false,
            admin_index: 3,
            apply_date: currentTime,
            event_index: null,
            fail_cnt: 0,
            last_login: currentTime,
            permission_date: null,
            permission_yn: false,
            pw_duedate: null,
            temppw: null,
            start_date: start_date ? start_date.toISOString() : null,
            end_date: end_date ? end_date.toISOString() : null,
            role_index: data.role_index === 'director' ? 1 : data.role_index === 'host' ? 2 : null,
        };

        // Merge additional variables with existing data
        const mergedData = {...dataWithoutRepw, ...additionalData};

        console.log(mergedData);

        // Send the merged object using axios.post
        try {
            const response = await axios.post("http://localhost:8080/signup", mergedData);
            console.log('Response:', response.data);

            navigate('/login/loginPage');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function generateRandomString(length) {
        const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = CHARACTERS.length;
        for (let i = 0; i < length; i++) {
            result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleClickOpenRegister = async () => {
        const code = generateRandomString(12); // 12자 랜덤 문자열 생성
        //const { email } = data;
        const additionalData = {
            email_status: false,
            code: code
        };

        const mergedData_2 = {
            email,
            ...additionalData,
        };

        console.log(mergedData_2);

        try {
            const response = await axios.post("http://localhost:8080/signup/email", mergedData_2);
            console.log('Response:', response);
            setOpenRegister(true);

        } catch (error) {
            console.error('Error sending verification code:', error);
            console.log('오류가 발생했습니다. 다시 시도해 주세요.');
            setOpenRegister(true);
        }
    };

    const onError = (errors) => {
        // 에러가 있는 경우 적절한 메시지를 출력하거나 처리합니다.
        console.log(errors);
    };

    const onNextClick = () => {    // 이전 페이지로 이동하도록
        navigate('/login/loginPage');
    };

    // 이미 가입 되어있다면, 로그인해주세요 <- 유효성 확인 X
    const handleLoginClick = () => {
        navigate('/login');
    };

    // 역할 부분 const
    const [role_index, setRoleIndex] = useState('');

    // 소속 부분 const
    const [org, setOrg] = useState('');
    const [customOrg, setCustomOrg] = useState('');  // 별도의 직접 입력 값을 위한 상태
    const [isCustomInput, setIsCustomInput] = useState(false);  // 직접 입력 활성화 상태
    const handleOrgChange = (event) => {
        const value = event.target.value;
        setOrg(value);
        setIsCustomInput(value === 'custom');  // '직접 입력'이 선택되면 입력 필드를 활성화
        if (value !== 'custom') {
            setCustomOrg('');  // '직접 입력'이 아니면 입력 필드 초기화
        }
    };

    // 날짜 선택 부분 const
    const [start_date, setStartdate] = React.useState(null);
    const [end_date, setEnddate] = useState(null);

    // 이메일 인증 부분 const
    const [openRegister, setOpenRegister] = useState(false);
    // const handleClickOpenRegister = () => {
    //     setOpenRegister(true);
    // };
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    // 이메일 상태 관리
    const [isEmailValid, setIsEmailValid] = useState(false);
    // 회원가입 에러 메시지를 관리하는 상태
    const [signupError, setSignupError] = useState('');

    // 화면
    // const paperStyle = {
    //     padding: '20px',
    //     margin: 'auto',
    //     maxHeight: 'calc(100vh - 100px)', // 브라우저 창 높이에서 100px 뺀 값
    //     overflowY: 'auto', // 내용이 많을 경우 스크롤
    //     color: 'white', // 글자색
    //     width: '80%', // 너비 설정
    //     display: 'flex', // flex 컨테이너로 설정
    //     flexDirection: 'column', // 자식 요소들을 수직으로 배치
    //     alignItems: 'center' // 자식 요소들을 중앙에 정렬
    // };
    // const titleStyle = {
    //     mb: 4,
    //     color: 'white',
    // };



    // 페이지 디자인 const


    // 이메일 버튼 디자인


    // 비밀번호
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const pw = watch("pw"); // 재입력한 비밀번호가 일치하는지 확인


    return (
        <Grid
            container
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit, onError)}
            sx={formSx}
        >
            <Grid item xs={12} sx={{mt:3}}>
                <Typography variant="h6">
                    기본 정보
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{mt: 2, mb: 3}}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*이름*/}
                <CustomTextField
                    label="이름"
                    id="name"
                    {...register("name", {required: "이름을 입력해주세요."})}
                    inputProps={{maxLength: 30}}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    style={{marginBottom: errors.name ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid item xs={12} sx={{mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*아이디*/}
                <CustomTextField
                    label="아이디"
                    id="id"
                    {...register("id", {
                        required: "아이디를 입력해주세요.",
                        pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: "영어 또는 숫자로만 입력해주세요.",
                        },
                        minLength: {
                            value: 4,
                            message: "아이디는 4글자 이상이어야 합니다.",
                        },
                        maxLength: {
                            value: 12,
                            message: "아이디는 12글자 이하이어야 합니다.",
                        },
                    })}
                    // inputProps={{ maxLength: 30 }}
                    error={!!errors.id}
                    helperText={errors.id?.message}
                    style={{marginBottom: errors.id ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid container sx={{mb: 2}}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft:'393px', flexGrow: 0}}> {/*이메일*/}
                    <CustomTextField
                        label="이메일"
                        id="email"
                        {...register("email", {
                            required: "이메일을 입력해주세요.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "올바른 이메일 형식으로 입력해주세요."
                            },
                            onChange: (e) => {
                                const value = e.target.value;
                                setIsEmailValid(
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                                );
                            },
                        })}
                        inputProps={{maxLength: 30}}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        style={{marginBottom: errors.email ? '0px' : '23px', width: '298px'}}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight:'223.5px', flexGrow: 0}}> {/*이메일 인증버튼*/}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpenRegister}
                        sx={{ ...buttonsx, width: "130px", height: '55px', mt: 0}}
                        disabled={!isEmailValid} // 유효성 검사 통과하면 버튼 활성화
                    >
                        인증번호 받기
                    </Button>
                    <EmailAlert open={openRegister} handleClose={handleCloseRegister}/>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*비밀번호*/}
                <CustomTextField
                    label="비밀번호"
                    id="pw"
                    type={showPassword ? 'text' : 'password'}
                    {...register("pw", {
                        required: "비밀번호를 입력해주세요.",
                        minLength: {
                            value: 8,
                            message: "비밀번호는 8글자 이상이어야 합니다."
                        },
                        maxLength: {
                            value: 30,
                            message: "비밀번호는 30글자 이하이어야 합니다."
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
                            message: "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다."
                        }
                    })}
                    InputProps={{  // 비밀번호 비가시화
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{maxLength: 30}}
                    error={!!errors.pw}
                    helperText={errors.pw?.message}
                    style={{marginBottom: errors.pw ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid item xs={12} sx={{mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*비밀번호 재확인*/}
                <CustomTextField
                    label="비밀번호 재확인"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register("repw", {
                        required: "비밀번호를 다시 입력해주세요.",
                        validate: value => value === pw || "입력한 비밀번호와 일치하지 않습니다."
                    })}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{maxLength: 30}}
                    error={!!errors.repw}
                    helperText={errors.repw?.message}
                    style={{marginBottom: errors.repw ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid item xs={12} sx={{mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*전화번호*/}
                <CustomTextField
                    label="전화번호"
                    id="phone"
                    {...register("phone", {
                        required: "전화번호를 입력해주세요.",
                        pattern: {
                            value: /^0\d{1,2}-\d{3,4}-\d{4}$/,
                            message: "올바른 전화번호 형식으로 입력해주세요. 예: 010-0000-0000"
                        }
                    })}
                    inputProps={{maxLength: 30}}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    style={{marginBottom: errors.phone ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">
                    추가 정보
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{mt: 2, mb: 2}}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*회원유형*/}
                <CustomTextField
                    margin="normal"
                    fullWidth
                    select // drop down 메뉴로 사용하기 위해 select 속성 추가
                    label="회원유형"
                    id="role_index"
                    {...register("role_index", {required: "회원유형을 선택해주세요."})}
                    value={role_index}
                    style={{width: '457px'}}
                    onChange={(e) =>
                        setRoleIndex(e.target.value)}
                >
                    <MenuItem value="director">관공서</MenuItem>
                    <MenuItem value="host">행사 관리자</MenuItem>
                </CustomTextField>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft:'310px', flexGrow: 0}}> {/*시작날짜*/}
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort: 'M'}}>
                        <DatePicker
                            label="시작 날짜"
                            id="start_date"
                            value={start_date}
                            onChange={(newValue) => setStartdate(newValue)}
                            sx={dateStyles}
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'day']}
                            renderInput={(params) => <CustomTextField {...params}{...register("start_date")} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight:'310px', flexGrow: 0}}> {/*종료날짜*/}
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{monthShort: 'M'}}>
                        <DatePicker
                            label="종료 날짜"
                            id="end_date"
                            value={end_date}
                            onChange={(newValue) => setEnddate(newValue)}
                            sx={dateStyles}
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'day']}
                            renderInput={(params) => <CustomTextField {...params}{...register("end_date")} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*소속*/}
                <CustomTextField
                    margin="normal"
                    fullWidth
                    select
                    label="소속"
                    value={org}
                    style={{width: '457px'}}
                    onChange={handleOrgChange}
                >
                    <MenuItem value="custom">직접 입력</MenuItem>
                    <MenuItem value="3">청와대</MenuItem>
                    <MenuItem value="4">도청</MenuItem>
                    <MenuItem value="5">구청</MenuItem>
                    <MenuItem value="6">시청</MenuItem>
                    <MenuItem value="7">군청</MenuItem>
                    <MenuItem value="8">동사무소</MenuItem>
                    <MenuItem value="9">소방본부</MenuItem>
                    <MenuItem value="10">소방서</MenuItem>
                    <MenuItem value="11">경찰청</MenuItem>
                    <MenuItem value="12">지방해양경찰청</MenuItem>
                    <MenuItem value="13">경찰소</MenuItem>
                    <MenuItem value="14">지역 병원 응급실</MenuItem>
                </CustomTextField>
                {isCustomInput && (
                    <CustomTextField
                        fullWidth
                        label="직접 입력"
                        value={customOrg}
                        onChange={(e) => setCustomOrg(e.target.value)}
                        margin="normal"
                    />
                )}
            </Grid>
            <Grid item xs={12} sx={{mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> {/*소속 전화번호*/}
                <CustomTextField
                    label="소속 전화번호"
                    id="org_phone"
                    {...register("org_phone", {
                        required: "소속 전화번호를 입력해주세요.",
                        pattern: {
                            value: /^0\d{1,2}-\d{3,4}-\d{4}$/,
                            message: "올바른 전화번호 형식으로 입력해주세요. 예: 02-0000-0000"
                        }
                    })}
                    inputProps={{maxLength: 30}}
                    error={!!errors.org_phone}
                    helperText={errors.org_phone?.message}
                    style={{marginBottom: errors.org_phone ? '0px' : '23px', width: '457px'}}
                />
            </Grid>
            <Grid item xs={12} sx={{mb: 3}}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {/* <Grid item xs={12} display={{md: 'flex'}} justifyContent={{md: 'center'}}> */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{...buttonsx, width: "280px", height: '44.5px',}}
                    disabled={!isValid}>완료</Button>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <DialogActions>
                    <Button onClick={handleLoginClick} color="primary">
                        이미 가입하셨다면, 로그인해 주세요!
                    </Button>
                </DialogActions>
            </Grid>
        </Grid>
    );
};

export default SignUpForm;