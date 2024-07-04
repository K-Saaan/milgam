import React, { useState } from 'react';
import { Box } from '@mui/material';
import FaqItem from './FaqItem';

const questions = [
  { question: '대시보드의 지도에서 다른 지역도 확인할 수 있나요?', answer: '네, 가능합니다.' },
  { question: '대체 가이드는 어디에서 확인할 수 있나요?', answer: '가이드 페이지에서 확인할 수 있습니다.' },
  { question: '각 등급의 의미는 무엇인가요?', answer: '등급의 의미는 등급 페이지에서 확인할 수 있습니다.' },
  { question: '서비스 사용 기간을 연장하고 싶어요.', answer: '크라우드 매니지먼트 담당자 (emailID@email.com)에게 문의 주세요.' },
  { question: '파일을 어떻게 업로드 할 수 있나요?', answer: '업로드 페이지에서 업로드 할 수 있습니다.' },
  { question: '기타 문의사항', answer: '기타 문의사항은 문의 페이지에서 확인할 수 있습니다.' },
];

function FaqContent() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {questions.map((item, index) => (
        <FaqItem 
          key={index} 
          item={item} 
          index={index} 
          expanded={expanded} 
          handleChange={handleChange} 
        />
      ))}
    </Box>
  );
}

export default FaqContent;
