import React from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <h2>Add Team Member</h2>
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
      <button type="button" onClick={handleAddMember}>
        Add Member
      </button>
      <button type="button" onClick={() => setShowAddModal(false)}>
        Cancel
      </button>
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
