import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const FaqItem = ({ item, index, expanded, handleChange }) => {
  const isExpanded = expanded === `panel${index}`;

  const accordionStyle = {
    backgroundColor: isExpanded ? '#4880FF' : '#273142',
    color: isExpanded ? 'white' : 'inherit',
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

  const accordionSummaryStyle = {
    '& .MuiAccordionSummary-content': { justifyContent: 'space-between' },
  };

  const accordionDetailsStyle = {
    color: 'white',
  };

  const typographyStyle = {
    fontWeight: 'bold',
  };

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
        expandIcon={isExpanded ? <CloseIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon />}
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
          <Typography variant="body2" sx={{ color: 'white' }}>
            A
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {item.answer}
          </Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqItem;
