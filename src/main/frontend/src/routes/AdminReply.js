import React from "react";
import ReplyInquiry from "../components/Admin/ReplyInquiry.js";
import DashBackground from "../components/DashBackground"


const AdminReply = ({ }) => {
    return (
        <DashBackground name={"문의 답변"} contents={<ReplyInquiry/>}/>
    );
}

export default AdminReply;