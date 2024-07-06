import React from "react";
import Approval from "../components/Admin/Approval.js";
import DashBackground from "../components/DashBackground"


const AdminApproval = ({ }) => {
    return (
        <DashBackground name={"가입 승인"} contents={<Approval/>}/>
    );
}

export default AdminApproval;