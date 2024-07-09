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
    const [alAlertOpen, alSetOpen] = React.useState(false);
    const [npAlertOpen, npSetOpen] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");

    const formSx = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        height: '65vh',
    };

    //회원가입 이동
    const onSignupClick = () => { navigate('/signup'); };
    //알림 팝업창 열고 닫기
    const alHandleClickOpen = () => { alAlertOpen(true); };
    const alHandleClose = () => { alSetOpen(false); };
    const npHandleClickOpen = () => { npAlertOpen(true); };
    const npHandleClose = () => { npSetOpen(false); };

    const onLogIn = async (data) => {
        const { id, pw } = data;

        if (id && pw) {
            try {
                console.log("data : ", data)
                const res = await axios.post("http://localhost:8080/login/loginAction", data);
                console.log(res.data);
                if (res.data.RESULT === "GO_MAIN") {
                    console.log("go dashboasr")
                    navigate('/dashboard');
                } else if (res.data === "diff") {
                    setPasswordError("비밀번호가 틀렸습니다.");
                } else if (res.data === "lock") {
                    alHandleClickOpen();
                } else if (res.data === "assign") {
                    npHandleClickOpen();
                }
            } catch (error) {
                console.error("오류가 발생하였습니다:", error);
                setPasswordError("오류가 발생하였습니다.");
            }
        }
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
                    id="id"
                    {...register("id", { required: "아이디를 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.id}
                    helperText={errors.id?.message}
                    style={{ marginBottom: errors.id ? '0px' : '23px' }}
                />
            </div>
            <div>
                <CustomTextField
                    label="비밀번호"
                    id="pw"
                    type="password"
                    {...register("pw", { required: "비밀번호를 입력해주세요." })}
                    inputProps={{ maxLength: 30 }}
                    error={!!errors.pw || !!passwordError}
                    helperText={errors.pw?.message || passwordError}
                    style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                />
            </div>
            <SignupButton onClick={onSignupClick} />
            <div>
                <LongButton type="submit" variant="contained">로그인</LongButton>
            </div>
            <AccountLockAlert alertOpen={alAlertOpen} handleClose={alHandleClose} />
            <NoPermissionAlert alertOpen={npAlertOpen} handleClose={npHandleClose} />
        </Stack>
    );
};

export default LogInForm;