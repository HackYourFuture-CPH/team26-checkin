import React, { useState, useEffect } from 'react';
import { apiURL } from '../../apiURL';
import { useTeamIdContext } from '../../hooks/contextHook';

const ReportPage = () => {
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
    <div>
      <h2>Check-in Questions</h2>
      {questions.map((question) => (
        <div key={question.question_id}>
          <p>{question.question_text}</p>
          <textarea
            placeholder="Your response"
            value={responses[question.question_id]}
            onChange={(e) =>
              handleResponseChange(question.question_id, e.target.value)
            }
            rows="2"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading || isSubmitDisabled}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export { ReportPage };
