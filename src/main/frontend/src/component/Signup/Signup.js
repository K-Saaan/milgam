import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box, CircularProgress, InputAdornment } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phoneHelperText, setPhoneHelperText] = useState('');

    const handleSignUp = (event) => {
        event.preventDefault();
        // 회원가입 로직 구현
        console.log(username, email, password, confirmPassword, phone);
    };

    const isValidUsername = (username) => {
        // 여기에 username 유효성 검사 로직 추가
        // 예: username이 4자 이상인 경우 유효하다고 가정
        return username.length >= 4;
    };

    const isValidPassword = (password) => {
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const validLength = password.length >= 10;
        const validShortLength = password.length >= 8;
        
        const typeCount = [hasLetters, hasNumbers, hasSpecialChars].filter(Boolean).length;
        
        if ((typeCount >= 2 && validLength) || (typeCount === 3 && validShortLength)) {
            return true;
        } else {
            return false;
        }
    };

    const handlePasswordChange = (e) => {
        const newPass = e.target.value;
        setPassword(newPass);
        if (newPass.length > 0) {
            if (isValidPassword(newPass)) {
                setPasswordError(false);
                setPasswordHelperText('');
            } else {
                setPasswordError(true);
                setPasswordHelperText('비밀번호 조건에 맞지 않음');
            }
        }
        // Confirm password validation on password change
        if (confirmPassword.length > 0) {
            if (newPass !== confirmPassword) {
                setConfirmPasswordError(true);
                setConfirmPasswordHelperText('비밀번호가 일치하지 않음');
            } else {
                setConfirmPasswordError(false);
                setConfirmPasswordHelperText('');
            }
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPass = e.target.value;
        setConfirmPassword(newConfirmPass);
        if (newConfirmPass !== password) {
            setConfirmPasswordError(true);
            setConfirmPasswordHelperText('비밀번호가 일치하지 않음');
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordHelperText('');
        }
    };

    const isValidPhone = (phone) => {
        // 예시: 한국 전화번호 형식 검사 (010-xxxx-xxxx)
        return /^010-\d{4}-\d{4}$/.test(phone);
    };

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        if (isValidPhone(newPhone)) {
            setPhoneError(false);
            setPhoneHelperText('');
        } else {
            setPhoneError(true);
            setPhoneHelperText('유효하지 않은 전화번호 형식');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, padding: 3 }}>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        InputProps={{
                            endAdornment: isValidUsername(username) ? <CheckCircleIcon style={{ color: 'green' }} /> : null
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordHelperText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {password.length > 0 && !passwordError ? <CheckCircleIcon style={{ color: 'green' }} /> :
                                    passwordError ? <ErrorIcon style={{ color: 'red' }} /> : null}
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={confirmPasswordError}
                        helperText={confirmPasswordHelperText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!confirmPasswordError && confirmPassword ? <CheckCircleIcon style={{ color: 'green' }} /> :
                                    confirmPasswordError ? <ErrorIcon style={{ color: 'red' }} /> : null}
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        error={phoneError}
                        helperText={phoneHelperText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!phoneError && phone ? <CheckCircleIcon style={{ color: 'green' }} /> : null}
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        다음
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;
