import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MenuItem, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NextButton from "./NextButton.js";
import CustomTextField from '../Styles/CustomTextField.js';
import EmailAlert from './EmailAlert';
import { useTheme } from '@mui/material/styles';

const SignUpForm = ({ marginBottom }) => {
    const theme = useTheme();

    const { register, formState: { errors } } = useForm();
    
    // 페이지 이동 부분 const
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    const onNextClick = () => {    // 로그인 페이지로 이동하도록
        navigate('/login');
    };
    // 역할 부분 const
    const [category, setCategory] = useState('');
    
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
    // 이메일 인증 부분 const
    const [openRegister, setOpenRegister] = useState(false);
    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };
    // 화면
    const paperStyle = {
        padding: '20px',
        margin: 'auto',
        maxHeight: 'calc(100vh - 100px)', // 브라우저 창 높이에서 100px 뺀 값
        overflowY: 'auto', // 내용이 많을 경우 스크롤
        color: theme.palette.text.primary, // 글자색
        width: '80%', // 너비 설정
        display: 'flex', // flex 컨테이너로 설정
        flexDirection: 'column', // 자식 요소들을 수직으로 배치
        alignItems: 'center' // 자식 요소들을 중앙에 정렬
      };
      


    return (
            <div style={paperStyle}>
                <div>
                    <CustomTextField
                        label="이름"
                        id="name"
                        {...register("name", { required: "이름을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        style={{ marginBottom: errors.name ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        label="아이디"
                        id="id"
                        {...register("id", {
                            required: "아이디를 입력해주세요.",
                            pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message: "영어와 숫자만 입력 가능합니다.",
                            },
                            minLength: {
                                value: 5,
                                message: "아이디는 5글자 이상이어야 합니다.",
                            },
                            maxLength: {
                                value: 30,
                                message: "아이디는 30글자 이하이어야 합니다.",
                            },
                        })}
                        // inputProps={{ maxLength: 30 }}
                        error={!!errors.id}
                        helperText={errors.id?.message}
                        style={{ marginBottom: errors.id ? '0px' : '23px' }}
                    />
                </div>
                <div>
                <CustomTextField
                        label="이메일"
                        id="email"
                        {...register("email", { required: "이메일을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        style={{ marginBottom: errors.email ? '0px' : '23px' }}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={handleClickOpenRegister}>
                    이메일 인증
                </Button>
                <EmailAlert open={openRegister} handleClose={handleCloseRegister} />
                <div>
                <CustomTextField
                        label="비밀번호"
                        id="pw"
                        {...register("pw", { required: "비밀번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.pw}
                        helperText={errors.pw?.message}
                        style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                    /> 
                </div>
                <div>
                    <CustomTextField
                        label="비밀번호 재확인"
                        id="pw"
                        {...register("pw", { required: "비밀번호를 다시 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.pw}
                        helperText={errors.pw?.message}
                        style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        label="전화번호"
                        id="phone"
                        {...register("phone", { required: "전화번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        style={{ marginBottom: errors.phone ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        margin="normal"
                        fullWidth
                        select // drop down 메뉴로 사용하기 위해 select 속성 추가
                        label="구분"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="director">관공서</MenuItem>
                        <MenuItem value="host">행사 관리자</MenuItem>
                    </CustomTextField>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="시작 날짜"
                                renderInput={(params) => <CustomTextField {...params} />}
                            />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="종료 날짜"
                            renderInput={(params) => <CustomTextField {...params} />} 
                            />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </div>
                <div>
                    <CustomTextField
                        margin="normal"
                        fullWidth
                        select
                        label="소속"
                        value={org}
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
                </div>
                <div>
                    <CustomTextField
                        label="소속 전화번호"
                        id="org_phone"
                        {...register("org_phone", { required: "소속 전화번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.org_phone}
                        helperText={errors.org_phone?.message}
                        style={{ marginBottom: errors.org_phone ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <NextButton type="submit" onClick={onNextClick}>완료</NextButton>
                </div>
            </div>
    );
};

export default SignUpForm;