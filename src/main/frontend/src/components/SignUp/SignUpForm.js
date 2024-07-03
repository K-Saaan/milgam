import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Box, MenuItem, FormControl,
    InputLabel, Select, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import LongButton from "../Styles/LongButton.js";
import NextButton from "./NextButton.js";
import CustomTextField from '../Styles/CustomTextField.js';
import Background from "../Background";

const SignUpForm = ({ marginBottom }) => {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [alertOpen, setOpen] = React.useState(false);
    const userType = watch('userType'); // 폼 필드 값 관찰
    const [redirectPath, setRedirectPath] = useState(null); // 리다이렉션 경로 상태
    const formSx = { // 폼 스타일
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px',
    };
    const handleClickOpen = () => { // 알림창 열림 함수
        setOpen(true);
    };
    const handleClose = () => { // 알림창 닫힘 함수
        setOpen(false);
    };

    const [role, setRole] = useState(''); // 현재 선택된 역할을 관리하는 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const handleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole); // 선택된 역할을 상태로 설정

        // 역할에 따라 다른 페이지로 이동
        if (selectedRole === 'government') {
            navigate('/signup/directorsignup'); // 관공서 페이지로 이동
        } else if (selectedRole === 'eventManager') {
            navigate('/signup/hostsignup'); // 행사 담당자 페이지로 이동
        }
    };


    return (
        <Background
            name="회원가입"
            contents={
            <>
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
                    {/* <FormControl fullWidth>
                        <InputLabel id="usertype">구분</InputLabel>
                        <Select
                        labelId="usertype"
                        id="userType"
                        value={userType || ''}
                        label="구분"
                        onChange={(e) => setValue('userType', e.target.value)}
                        {...register("userType", { required: "사용자 유형을 선택해주세요." })}
                        error={!!errors.userType}
                        >
                        <MenuItem value="host">행사관리자</MenuItem>
                        <MenuItem value="director">관공서</MenuItem>
                        </Select>
                        {errors.userType && <p style={{ color: 'red', marginBottom: 0 }}>{errors.userType.message}</p>}
                    </FormControl> */}
                    <select value={role} onChange={handleChange} className="role-select">
                        <option value="">선택해주세요</option>
                        <option value="government">관공서</option>
                        <option value="eventManager">행사 담당자</option>
                    </select>
                </div>
                <div>
                    <LongButton component={Link} to={redirectPath} variant="contained">다음</LongButton>
                </div>
            </>
            }
        />
    );
};

export default SignUpForm;