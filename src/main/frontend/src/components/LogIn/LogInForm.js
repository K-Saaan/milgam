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
import useStore from "../../store";

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
    const alHandleClickOpen = () => { alSetOpen(true); };
    const alHandleClose = () => { alSetOpen(false); };
    const npHandleClickOpen = () => { npSetOpen(true); };
    const npHandleClose = () => { npSetOpen(false); };

    const {setIsLogined} = useStore(state => state);
    const onLogIn = async (data) => {
        const { id, pw } = data;

        if (id && pw) {
            try {
                const res = await axios.post("http://localhost:8080/login/loginAction", data);

                // 0715: 서버 응답에 따른 리다이렉션 처리
                if (res.data.RESULT === "GO_USER_DASHBOARD") {
                console.log("data : ", data)
                const res = await axios.post("/login/loginAction", data, {
                    withCredentials: true, // 쿠키를 포함한 요청
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("response data", res.data);
                if (res.data.RESULT === "GO_MAIN") {
                    console.log("go dashboard")
                    localStorage.setItem("key", data.id);
                    setIsLogined(true);
                    navigate('/dashboard');
                } else if (res.data.RESULT === "GO_ADMIN_DASHBOARD") {
                    localStorage.setItem("key", data.id);
                    setIsLogined(true);
                    navigate('/admin/approval');
                } else if (res.data.RESULT === "diff") {
                    setPasswordError("비밀번호가 틀렸습니다.");
                } else if (res.data.RESULT === "lock") {
                    alHandleClickOpen();
                } else if (res.data.RESULT === "assign") {
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