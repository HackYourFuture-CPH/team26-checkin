// components/ReportPage/ReportPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const ReportPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/reportPage/userQuestions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].response = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      // Implement your logic to submit responses
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Report Page
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.question_id}>
            <Typography variant="h6">{question.question_text}</Typography>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={question.response || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              margin="normal"
            />
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReportPage;
