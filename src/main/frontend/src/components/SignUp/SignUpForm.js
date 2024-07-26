import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Typography, DialogActions, Grid, Divider, IconButton, InputAdornment, MenuItem} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import CustomTextField from '../Styles/CustomTextField.js';
import EmailAlert from './EmailAlert';

const noScrollbarStyles = {
    '&::WebkitScrollbar': {
        display: 'none',
    },
    'msOverflowStyle': 'none',
    'scrollbarWidth': 'none'
};

const formSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '1100px',
    maxWidth: '1100px',
    minWidth: '1100px',
    ...noScrollbarStyles
};

/**
 * 1. ClassName: SignUpForm
 * 2. FileName : SignUpForm.js
 * 3. Package  : components.SignUpForm
 * 4. Comment  : 회원가입 화면
 * 5. 작성자   : seungwon
 * 6. 작성일    : 2024. 07. 23
 **/
const SignUpForm = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}, setValue, watch, control, trigger} = useForm({
        mode: 'onChange',
    })
    const [role_index, setRoleIndex] = useState('');
    const [org, setOrg] = useState('');
    const [customOrg, setCustomOrg] = useState('');
    const [isCustomInput, setIsCustomInput] = useState(false);
    const [start_date, setStartdate] = React.useState(null);
    const [end_date, setEnddate] = useState(null);
    const [openRegister, setOpenRegister] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    /**
     * 지정된 길이의 랜덤 문자열을 생성하는 함수.
     * 
     * @param {number} length - 생성할 문자열의 길이
     * @returns {string} - 생성된 랜덤 문자열
     */
    function generateRandomString(length) {
        const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = CHARACTERS.length;
        for (let i = 0; i < length; i++) {
            result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // 에러 확인
    const onError = (errors) => {
        console.log(errors);
    };

    // 이미 가입 되어있다면, 로그인해주세요 <- 유효성 확인 X
    const handleLoginClick = () => {
        navigate('/login');
    };

    // 회원 소속 '직접 입력' 상태 관리
    const handleOrgChange = (event) => {
        const value = event.target.value;
        setOrg(value);
        setIsCustomInput(value === 'custom');  // '직접 입력'이 선택되면 입력 필드를 활성화
        if (value !== 'custom') {
            setCustomOrg('');  // '직접 입력'이 아니면 입력 필드 초기화
        }
    };

    // Email Alert 창 닫기
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    // 인증 성공 시 호출될 함수
    const handleEmailVerified = () => {
        setIsEmailVerified(true);
        setVerificationMessage('인증에 성공하였습니다.');
    };

    // 비밀번호 가시화
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const email = watch('email');
    const pw = watch("pw"); // 재입력한 비밀번호가 일치하는지 확인

    /**
     * 1. MethodName: handleClickOpenRegister
     * 2. ClassName : SignUpForm
     * 3. Comment   : 이메일 유효성 검사 성공 시 이메일로 인증번호 발송
     * 4. 작성자    : byeongmin
     * 5. 작성일    : 2024. 07. 15
     **/
    const handleClickOpenRegister = async () => {
        const code = generateRandomString(12); // 12자 랜덤 문자열 생성
        const additionalData = {
            email_status: false,
            code: code
        };

        const mergedData_2 = {
            email,
            ...additionalData,
        };

        console.log(mergedData_2);

        while (true) {
            try {
                const response = await axios.post("/signup/email", mergedData_2);
                console.log('Response:', response);
                setOpenRegister(true);
                break; // 요청이 성공하면 루프를 종료
            } catch (error) {
                console.error('Error sending verification code:', error);
                console.log('오류가 발생했습니다. 다시 시도해 주세요.');

                // 요청 간의 간격을 두고 다시 시도 (예: 0.5초 후에 재시도)
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    };

    /**
     * 1. MethodName: onSubmit
     * 2. ClassName : SignUpForm
     * 3. Comment   : 회원가입 시 입력 정보 DB로 넘기기
     * 4. 작성자    : byeongmin
     * 5. 작성일    : 2024. 07. 23
     **/
    const onSubmit = async (data) => {
        const { repw, ...dataWithoutRepw } = data;

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
            role_index: data.role_index === "director" ? 1 : data.role_index === "host" ? 2 : null,
        };

        const mergedData = { ...dataWithoutRepw, ...additionalData };

        console.log(mergedData);

        while (true) {
            try {
                const response = await axios.post("/signup", mergedData);
                console.log("Response:", response.data);

                navigate("/login/loginPage");
                break; // 요청이 성공하면 루프를 종료
            } catch (error) {
                console.error("Error:", error);

                // 요청 간의 간격을 두고 다시 시도 (예: 0.5초 후에 재시도)
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    };

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
                        helperText={errors.email?.message || verificationMessage}
                        style={{marginBottom: errors.email ? '0px' : '23px', width: '298px'}}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight:'223.5px', flexGrow: 0}}> {/*이메일 인증버튼*/}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpenRegister}
                        sx={{ ...buttonsx, width: "130px", height: '55px', mt: 0}}
                        disabled={!isEmailValid || isEmailVerified} // 유효성 검사 통과하면 버튼 활성화, 인증 성공 시 비활성화
                    >
                        인증번호 받기
                    </Button>
                    <EmailAlert open={openRegister} handleClose={handleCloseRegister} onSuccess={handleEmailVerified}/>
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
                        style={{width: '457px'}}
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