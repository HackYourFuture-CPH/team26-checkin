import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import { AddCheckinQuestionModal } from '../../components/CheckinQuestionsPage/AddCheckinQuestionModal';
import { EditCheckinQuestionModal } from '../../components/CheckinQuestionsPage/EditCheckinQuestionModal';
import { Button, Typography } from '@mui/material';
import NavigationBar from '../../components/Dashboard/NavigationBar';
import placeholder from './placeholder.png';
import QuestionList from '../../components/CheckinQuestionsPage/QuestionList';
import './CheckinQuestions.css';

const CheckinQuestions = () => {
  const [checkinQuestions, setCheckinQuestions] = useState(null);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [updatedQuestionText, setUpdatedQuestionText] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditQuestionId(null);
  };

  const handleOpenEditModal = (questionId, questionText) => {
    setEditQuestionId(questionId);
    setUpdatedQuestionText(questionText);
    setShowEditModal(true);
  };

  const handleEditQuestion = (questionId, questionText) => {
    handleOpenEditModal(questionId, questionText);
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
      setShowEditModal(false);
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
      <div className="dashboard-container">
        <NavigationBar />

        <div className="content-container">
          <div className="top-nav-bar">
            <div className="heading-text">
              <Typography variant="h4">Dashboard</Typography>
              <Typography className="sub-heading" variant="body1">
                Welcome back, Meraj
              </Typography>
            </div>

            <div className="image-container">
              <img
                className="placeholder-image"
                src={placeholder}
                alt="Placeholder"
              />
              <div className="name-mail-container">
                <Typography variant="h6">Meraj</Typography>
                <Typography className="subtext" variant="body2">
                  meraj@gmail.com
                </Typography>
              </div>
            </div>
          </div>

          <div className="question-list-container">
            <Typography
              variant="h6"
              component="h1"
              className="question-list-header"
            >
              Checkin Questions
            </Typography>

            <QuestionList
              checkinQuestions={checkinQuestions}
              editQuestionId={editQuestionId}
              handleEditQuestion={handleEditQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
            />

            <div className="button-container">
              <Button
                onClick={handleAddQuestion}
                variant="contained"
                color="primary"
              >
                Add Question
              </Button>
            </div>

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
                showEditModal={showEditModal}
                questionId={editQuestionId}
                questionText={updatedQuestionText}
                setQuestionText={setUpdatedQuestionText}
                handleSaveEdit={handleSaveEdit}
                handleClose={handleCloseEditModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CheckinQuestions };
