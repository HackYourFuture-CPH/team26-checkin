import React, { useState } from 'react';
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

const AddCheckinQuestionModal = ({
  showAddModal,
  setShowAddModal,
  newQuestionText,
  setNewQuestionText,
  handleAdd,
}) => {
  const [error, setError] = useState(false);

  const onSave = () => {
    if (newQuestionText.trim() === '') {
      setError(true);
      return;
    }
    handleAdd();
    setNewQuestionText('');
  };

  return (
    <Modal
      open={showAddModal}
      onClose={() => setShowAddModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-container">
        <Typography
          variant="h6"
          style={{ textAlign: 'center', marginBottom: '10px' }}
        >
          Add Checkin Question
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Write your question here..."
          multiline
          rows={4}
          value={newQuestionText}
          onChange={(e) => {
            setNewQuestionText(e.target.value);
            setError(false);
          }}
          fullWidth
          variant="outlined"
          error={error}
          helperText={error ? 'Question cannot be empty' : ''}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button variant="contained" onClick={onSave}>
            Add Question
          </Button>
          <Button variant="outlined" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
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
