import React, { useState, useEffect } from 'react';
import { apiURL } from '../../apiURL.js';
import { useTeamIdContext } from '../../hooks/contextHook.js';
import { Button, Typography } from '@mui/material';
import './ReportPageQuestions.css';
import CustomTextField from '../../components/ReportPage/ReportTextField.jsx'; // Import the custom text field component

const ReportPageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const { teamId } = useTeamIdContext();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const questionsRes = await fetch(`${apiURL()}/checkinQuestions`, {
          headers: { 'X-Team-ID': teamId },
        });
        const questionsData = await questionsRes.json();
        setQuestions(questionsData);

        // Initialize responses state
        const initialResponses = {};
        questionsData.forEach((question) => {
          initialResponses[question.question_id] = '';
        });
        setResponses(initialResponses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [teamId]); // Added teamId dependency

  const handleResponseChange = (questionId, text) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: text,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        responses,
      };

      const response = await fetch(`${apiURL()}/checkinResponses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Team-ID': teamId, // Add this if your API requires it
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit check-in data');
      }

      alert('Submitted successfully!');
      setResponses({});
    } catch (error) {
      console.error('Error submitting check-in:', error);
      alert('Error submitting data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isSubmitDisabled = questions.some(
    (q) => !responses[q.question_id] || responses[q.question_id].trim() === '',
  );

  return (
    <div className="report-container">
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        Check-in Questions
      </Typography>
      <div className="report-questions-container">
        {questions.map((question, index) => (
          <div className="questions-container" key={question.question_id}>
            <Typography className="question-text" variant="body1">{`${
              index + 1
            }. ${question.question_text}`}</Typography>
            <CustomTextField
              className="text-field"
              value={responses[question.question_id]}
              onChange={(value) =>
                handleResponseChange(question.question_id, value)
              }
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="contained"
        size="big"
        onClick={handleSubmit}
        disabled={loading || isSubmitDisabled}
      >
        {loading ? 'Submitting...' : 'Finish'}
      </Button>
    </div>
  );
};

export { ReportPageQuestions };
