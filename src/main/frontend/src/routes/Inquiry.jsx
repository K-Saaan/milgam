import React from 'react';
import InquiryBoard from '../components/Inquery/InqueryBoard';
import Background from "../components/Background"

const Inquiry = () => {
  return (
    <>
      <Background name={"문의 목록"} contents={<InquiryBoard />}/>
    </>
  );
};

export default Inquiry;
