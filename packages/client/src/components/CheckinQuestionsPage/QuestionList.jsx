import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../containers/QuestionPage/CheckinQuestions.css';

const QuestionList = ({
  checkinQuestions,
  editQuestionId,
  handleEditQuestion,
  handleDeleteQuestion,
}) => {
  return (
    <ul className="question-list">
      {checkinQuestions.map((question) => (
        <li key={question.question_id} className="question-item">
          <div className="question-content">
            <Typography>{question.question_text}</Typography>
            {editQuestionId !== question.question_id && (
              <div className="question-actions">
                <IconButton
                  onClick={() =>
                    handleEditQuestion(
                      question.question_id,
                      question.question_text,
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteQuestion(question.question_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

QuestionList.propTypes = {
  checkinQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  editQuestionId: PropTypes.number,
  handleEditQuestion: PropTypes.func.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
