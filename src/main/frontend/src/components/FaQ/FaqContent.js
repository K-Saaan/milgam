import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Box, Typography, Skeleton } from '@mui/material';
import FaqItem from './FaqItem';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

function FaqContent() {
  const [questions, setQuestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  // 아코디언 확장 상태 관리 함수
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchFaqs = async () => {
      try {
        setIsLoading(true); // 데이터 로딩 시작
        const response = await axios.get('/faq/question'); // 실제 API URL로 대체해야 합니다.
        console.log('FAQ 데이터:', response.data); // 데이터 확인을 위한 로그
        setQuestions(response.data);
      } catch (error) {
        console.error('FAQ 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false); // 데이터 로딩 종료
      }
    };

    fetchFaqs();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <>
          <Skeleton variant="text" height={50} />
          <Skeleton variant="text" height={50} />
          <Skeleton variant="text" height={50} />
        </>
      ) : questions.length === 0 ? (
        <Typography variant="h6" align="center">FAQ 데이터가 없습니다.</Typography>
      ) : (
        questions.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            index={index}
            expanded={expanded}
            handleChange={handleChange}
          />
        ))
      )}
    </Box>
  );
}

export default FaqContent;
