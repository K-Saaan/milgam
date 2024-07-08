import React from 'react';
import FaqContent from '../components/FaQ/FaqContent';
import DashBackground from "../components/DashBackground"

function FaQ() {
  return (
    <>
      <DashBackground name={"FaQ"} contents={<FaqContent />}/>
    </>
  );
}

export default FaQ;
