import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style} className="modal-container">
        <Typography
          variant="h6"
          style={{ textAlign: 'center', marginBottom: '10px' }}
        >
          Edit Checkin Question
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Write your question here..."
          multiline
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
