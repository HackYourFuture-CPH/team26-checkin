import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';

const EditCheckinQuestionModal = ({
  showEditModal,
  questionId,
  questionText,
  setQuestionText,
  handleSaveEdit,
  handleClose,
}) => {
  if (!showEditModal) {
    return null;
  }

  return (
    <Modal
      open={showEditModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <Typography variant="h6" className="modal-title">
          Edit Checkin Question
        </Typography>
        <TextField
          className="modal-textfield"
          id="outlined-multiline-static"
          label="Write your question here..."
          multiline
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Box className="button-container-edit-question">
          <Button
            variant="contained"
            onClick={() => handleSaveEdit(questionId)}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

EditCheckinQuestionModal.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  questionId: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  setQuestionText: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export { EditCheckinQuestionModal };
