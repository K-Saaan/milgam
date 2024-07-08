import React from "react";
import AdminLogInForm from "../components/Admin/AdminLogInForm.js";
import Background from "../components/Background"


const AdminLogIn = ({ }) => {
    return (
        <Background name={"로그인"} contents={<AdminLogInForm/>}/>
    );
}

export default AdminLogIn;