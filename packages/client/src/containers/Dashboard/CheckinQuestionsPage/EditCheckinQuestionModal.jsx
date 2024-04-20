import React from 'react';
import PropTypes from 'prop-types';

export const EditCheckinQuestionModal = ({
  showEditModal,
  questionId,
  questionText,
  setQuestionText,
  handleSaveEdit,
}) => {
  if (!showEditModal) {
    return null;
  }

  return (
    <div>
      <h2>Edit Checkin Question</h2>
      <textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter the updated question..."
        rows={4}
      ></textarea>
      <button
        type="button"
        onClick={() => handleSaveEdit(questionId, questionText)}
      >
        Save
      </button>
    </div>
  );
};

EditCheckinQuestionModal.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  questionId: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  setQuestionText: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
};
