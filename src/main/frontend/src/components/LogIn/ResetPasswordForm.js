import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LongButton from "../Styles/LongButton.js";
import CustomTextField from '../Styles/CustomTextField.js';

import Stack from '@mui/material/Stack';

const ResetPasswordForm = ({ marginBottom }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode: "onChange"});
    const pwd = watch("pw");

    const formSx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '100%',
    };

    const onLogIn = async (data) => {
        const { pw } = data;
        navigate('/dashboard');
    };

    return (
        <Stack
            component="form"
            spacing={3}
            noValidate
            autoComplete="off"
            sx={formSx}
            onSubmit={handleSubmit(onLogIn)}
        >
            <div>
                <CustomTextField
                    label="초기 비밀번호"
                    id="currentPw"
                    type="password"
                    {...register("currentPw", { required: "초기화된 비밀번호를 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.currentPw}
                    helperText={errors.currentPw?.message}
                    style={{ marginBottom: errors.currentPw ? '0px' : '23px' }}
                />
            </div>
            <div>
                <CustomTextField
                    label="비밀번호"
                    id="pw"
                    type="password"
                    {...register("pw", {
                        required: "새로 설정할 비밀번호를 입력해주세요." ,
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message: '영어 대소문자, 숫자, 특수문자를 포함시켜주세요.',
                        },
                        minLength: {
                          value: 8,
                          message: '8글자 이상 입력해주세요.',
                        },
                    })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.pw}
                    helperText={errors.pw?.message}
                    style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                />
            </div>
            <div>
                <CustomTextField
                    label="비밀번호 확인"
                    id="pwCheck"
                    type="password"
                    {...register("pwCheck", {
                        required: "새로 설정할 비밀번호를 다시 입력해주세요.",
                        validate: value => value === pwd || "비밀번호가 일치하지 않습니다."
                    })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.pwCheck}
                    helperText={errors.pwCheck?.message}
                    style={{ marginBottom: errors.pwCheck ? '0px' : '23px' }}
                />
            </div>
            <div>
                <LongButton type="submit" variant="contained">확인</LongButton>
            </div>
        </Stack>
    );
};

export default ResetPasswordForm;