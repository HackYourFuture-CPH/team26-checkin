import React from 'react';
import PropTypes from 'prop-types';

const AddCheckinQuestionModal = ({
  showAddModal,
  setShowAddModal,
  newQuestionText,
  setNewQuestionText,
  handleAdd,
}) => {
  if (!showAddModal) {
    return null;
  }

  return (
    <div>
      <h2>Add Checkin Question</h2>
      <textarea
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        placeholder="Enter the new question..."
        rows={4}
      ></textarea>
      <button type="button" onClick={handleAdd}>
        Add Question
      </button>
      <button type="button" onClick={() => setShowAddModal(false)}>
        Cancel
      </button>
    </div>
  );
};

AddCheckinQuestionModal.propTypes = {
  showAddModal: PropTypes.bool.isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  newQuestionText: PropTypes.string.isRequired,
  setNewQuestionText: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export { AddCheckinQuestionModal };
