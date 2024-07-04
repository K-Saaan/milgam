import React from 'react';
import Background from "../components/Background"
import InquiryBoard from '../components/Inquiry/InquiryBoard';

const Inquiry = () => {
  return (
    <>
      <Background name={"문의 목록"} contents={<InquiryBoard />}/>
    </>
  );
};

export default Inquiry;
