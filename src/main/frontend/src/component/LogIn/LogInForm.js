import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AccountLockAlert from "./AccountLockAlert.js";
import NoPermissionAlert from "./NoPermissionAlert.js";
import LongButton from "../Styles/LongButton.js";
import SignupButton from "./SignupButton.js";
import CustomTextField from '../Styles/CustomTextField.js';

import Stack from '@mui/material/Stack';

const LogInForm = ({ marginBottom }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alertOpen, setOpen] = React.useState(false);

    const formSx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px',
    };

    const onSignupClick = () => {
        navigate('/signup');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onLogIn = async (data) => {
        const { userId, password } = data;
        setOpen(true);

        /*if (userId && password) {
            try {
                const res = await axiosInstance.post(`/com/logIn`, { userId, password });
                if (res.status === 200) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.log(error);
                setOpen(true); // 에러 처리를 위한 코드 추가 필요
            }
        }*/
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
            <SignupButton onClick={onSignupClick} />
            <div>
                <LongButton type="submit" variant="contained">로그인</LongButton>
            </div>
            {/*<AccountLockAlert alertOpen={alertOpen} handleClose={handleClose} />*/}
            <NoPermissionAlert alertOpen={alertOpen} handleClose={handleClose} />
        </Stack>
    );
};

export default LogInForm;