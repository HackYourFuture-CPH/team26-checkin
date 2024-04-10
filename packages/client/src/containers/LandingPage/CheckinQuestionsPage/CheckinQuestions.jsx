import React, { useEffect, useState } from 'react';
import { apiURL } from '../../../apiURL';
//import './CheckinQuestions.css';
import { AddCheckinQuestionModal } from './AddCheckinQuestionModal';
import { EditCheckinQuestionModal } from './EditCheckinQuestionModal';

const CheckinQuestions = () => {
  const [checkinQuestions, setCheckinQuestions] = useState([]);
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
    }
  };

  const handleEditQuestion = (questionId, questionText) => {
    setEditQuestionId(questionId);
    setUpdatedQuestionText(questionText);
  };

  const handleAddQuestion = () => {
    setShowAddModal(true);
    setEditQuestionId(null); // Reset editQuestionId when adding a new question
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
      const response = await fetch(
        `${apiURL()}/checkinQuestions/addCheckinQuestion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question_text: newQuestionText }),
        },
      );
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
          {
            method: 'DELETE',
          },
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

  return (
    <div>
      <h1>Checkin Questions</h1>
      <div>
        <ul>
          {checkinQuestions.map((question) => (
            <li key={question.question_id}>
              {question.question_text}
              {editQuestionId !== question.question_id && (
                <>
                  <button
                    onClick={() =>
                      handleEditQuestion(
                        question.question_id,
                        question.question_text,
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.question_id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
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
