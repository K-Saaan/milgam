import React from 'react'
import Background from "../components/Background"
import LogInForm from '../components/LogIn/LogInForm'

function Login(){
    return (
      <>
        <Background name={"로그인"} contents={<LogInForm/ >}/>
      </>
    );
}

export default Login