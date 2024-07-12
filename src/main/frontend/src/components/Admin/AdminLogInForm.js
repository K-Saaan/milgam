import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import LongButton from "../Styles/LongButton.js";
import CustomTextField from '../Styles/CustomTextField.js';
import Stack from '@mui/material/Stack';

const AdminLogInForm = ({ marginBottom }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '75vh',
    };

    const onLogIn = async (data) => {
        const { userId, password } = data;
        navigate('/admin');
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
                    label="아이디"
                    id="userId"
                    {...register("userId", { required: "아이디를 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.userId}
                    helperText={errors.userId?.message}
                    style={{ marginBottom: errors.userId ? '0px' : '23px' }}
                />
            </div>
            <div>
                <CustomTextField
                    label="비밀번호"
                    id="password"
                    type="password"
                    {...register("password", { required: "비밀번호를 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    style={{ marginBottom: errors.password ? '0px' : '23px' }}
                />
            </div>
            <div>
                <LongButton type="submit" variant="contained">로그인</LongButton>
            </div>
        </Stack>
    );
};

export default AdminLogInForm;