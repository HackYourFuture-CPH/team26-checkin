import React, { useEffect, useState } from 'react';
import { apiURL } from '../../../apiURL';
import { AddCheckinQuestionModal } from './AddCheckinQuestionModal';
import { EditCheckinQuestionModal } from './EditCheckinQuestionModal';
import { Button, Typography } from '@mui/material';

const CheckinQuestions = () => {
  const [checkinQuestions, setCheckinQuestions] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [updatedQuestionText, setUpdatedQuestionText] = useState('');

  useEffect(() => {
    fetchCheckinQuestions();
  }, []);

  const fetchCheckinQuestions = async () => {
    try {
      const response = await fetch(`${apiURL()}/checkinQuestions`);
      if (!response.ok) {
        throw new Error('Failed to fetch checkin questions');
      }
      const data = await response.json();
      setCheckinQuestions(data);
    } catch (error) {
      console.error('Error fetching checkin questions:', error.message);
      setCheckinQuestions([]);
    }
  };

  const handleEditQuestion = (questionId, questionText) => {
    setEditQuestionId(questionId);
    setUpdatedQuestionText(questionText);
  };

  const handleAddQuestion = () => {
    setShowAddModal(true);
    setEditQuestionId(null);
  };

  const handleSaveEdit = async (questionId) => {
    try {
      const response = await fetch(
        `${apiURL()}/checkinQuestions/${questionId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question_text: updatedQuestionText }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to edit checkin question');
      }
      fetchCheckinQuestions();
      setEditQuestionId(null);
    } catch (error) {
      console.error('Error editing checkin question:', error.message);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`${apiURL()}/checkinQuestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question_text: newQuestionText }),
      });
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      fetchCheckinQuestions();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this question?',
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${apiURL()}/checkinQuestions/${questionId}`,
          { method: 'DELETE' },
        );
        if (!response.ok) {
          throw new Error('Failed to delete checkin question');
        }
        fetchCheckinQuestions();
      } catch (error) {
        console.error('Error deleting checkin question:', error.message);
      }
    }
  };

  if (checkinQuestions === null) {
    return <Typography>Loading Questions...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1">
        Checkin Questions
      </Typography>
      <ul>
        {checkinQuestions.map((question) => (
          <li key={question.question_id}>
            <Typography>{question.question_text}</Typography>
            {editQuestionId !== question.question_id && (
              <>
                <Button
                  onClick={() =>
                    handleEditQuestion(
                      question.question_id,
                      question.question_text,
                    )
                  }
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteQuestion(question.question_id)}
                  color="secondary"
                >
                  Delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Button onClick={handleAddQuestion} variant="contained" color="primary">
        Add Question
      </Button>
      {showAddModal && (
        <AddCheckinQuestionModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          newQuestionText={newQuestionText}
          setNewQuestionText={setNewQuestionText}
          handleAdd={handleAdd}
        />
      )}
      {editQuestionId && (
        <EditCheckinQuestionModal
          showEditModal={editQuestionId}
          questionId={editQuestionId}
          questionText={updatedQuestionText}
          setQuestionText={setUpdatedQuestionText}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export { CheckinQuestions };
