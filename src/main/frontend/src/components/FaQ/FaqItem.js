import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';


const FaqItem = ({ item, index, expanded, handleChange }) => {
  const isExpanded = expanded === `panel${index}`;
  const theme = useTheme();

  // 아코디언 스타일
  const accordionStyle = {
    // 확장에 따라 색 변경
    backgroundColor: isExpanded ? theme.palette.primary.main : theme.palette.background.paper,
    color: isExpanded ? theme.palette.text.primary : 'inherit',
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
    },
  };

  // 아코디언 요약 스타일
  const accordionSummaryStyle = {
    '& .MuiAccordionSummary-content': { justifyContent: 'space-between' },
  };

  // 아코디언 세부 스타일
  const accordionDetailsStyle = {
    color: theme.palette.text.primary,
  };

  // 질문 텍스트 스타일
  const typographyStyle = {
    fontWeight: 'bold',
  };

  // 본문 텍스트 스타일 
  const typographyBodyStyle = {
    flexGrow: 1,
    marginLeft: 2,
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange(`panel${index}`)}
      sx={accordionStyle}
    >
      <AccordionSummary
        expandIcon={isExpanded ? <CloseIcon sx={{ color: theme.palette.text.primary }} /> : <ExpandMoreIcon />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        sx={accordionSummaryStyle}
      >
        <Typography variant="body1" sx={typographyStyle}>
          Q
        </Typography>
        <Typography variant="body1" sx={typographyBodyStyle}>
          {item.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={accordionDetailsStyle}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            A
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            {item.answer}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqItem;
