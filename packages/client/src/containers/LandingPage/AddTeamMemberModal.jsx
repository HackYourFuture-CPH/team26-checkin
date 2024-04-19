import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Button, Modal, Box } from '@mui/material';
import './AddTeamMemberModal.css';

export const AddTeamMemberModal = ({
  showAddModal,
  setShowAddModal,
  newMemberFirstName,
  setNewMemberFirstName,
  newMemberLastName,
  setNewMemberLastName,
  handleAddMember,
}) => {
  if (!showAddModal) {
    return null;
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: `none`,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={showAddModal}
      onClose={() => setShowAddModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-container">
        {' '}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Team Member
        </Typography>
        <div className="add-member">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            value={newMemberFirstName}
            onChange={(e) => setNewMemberFirstName(e.target.value)}
            placeholder="First Name"
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            value={newMemberLastName}
            onChange={(e) => setNewMemberLastName(e.target.value)}
            placeholder="Last Name"
          />
          <Button variant="contained" onClick={handleAddMember}>
            Add
          </Button>
          <Button variant="outlined" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

AddTeamMemberModal.propTypes = {
  showAddModal: PropTypes.bool.isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  newMemberFirstName: PropTypes.string.isRequired,
  setNewMemberFirstName: PropTypes.func.isRequired,
  newMemberLastName: PropTypes.string.isRequired,
  setNewMemberLastName: PropTypes.func.isRequired,
  handleAddMember: PropTypes.func.isRequired,
};
