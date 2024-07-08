import React from "react";
import SignUpForm from "../components/SignUp/SignUpForm.js";
import Background from "../components/Background"


const SignUp = () => {
    return (
        <Background name={"회원가입"} contents={<SignUpForm/>}/>
    );
}
export default SignUp;