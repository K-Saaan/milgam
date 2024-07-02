import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

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
    <Box sx={{ width: '100%', maxWidth: '800px', margin: 'auto', mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
        FAQ
      </Typography>
      {questions.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{ 
            backgroundColor: expanded === `panel${index}` ? '#4880FF' : '#273142', 
            color: expanded === `panel${index}` ? 'white' : 'inherit',
            mb: 2, 
            borderRadius: '12px',
            '&:first-of-type': {
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            },
            '&:last-of-type': {
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
            },
            '&:before': {
              display: 'none',
            }
          }}
        >
          <AccordionSummary
            expandIcon={expanded === `panel${index}` ? <CloseIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{ 
              '& .MuiAccordionSummary-content': { justifyContent: 'space-between' }
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Q
            </Typography>
            <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: 2 }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ color: 'white' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                A
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {item.answer}
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default FaqContent;
