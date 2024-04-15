import React from 'react';
import PropTypes from 'prop-types';
import './AddTeamMemberModal.css';
import { Typography } from '@mui/material';

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
  return (
    <div className="container">
      <Typography variant="body1">Add Team Member</Typography>
      <div className="add-member">
        <input
          type="text"
          value={newMemberFirstName}
          onChange={(e) => setNewMemberFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={newMemberLastName}
          onChange={(e) => setNewMemberLastName(e.target.value)}
          placeholder="Last Name"
        />

        <button className="add-button" type="button" onClick={handleAddMember}>
          Add Member
        </button>
        <button
          className="cancel-button"
          type="button"
          onClick={() => setShowAddModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
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
