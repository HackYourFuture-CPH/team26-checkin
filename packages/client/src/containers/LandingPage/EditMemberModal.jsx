import React from 'react';
import PropTypes from 'prop-types';

const EditMemberModal = ({
  showEditModal,
  editMemberId,
  editMemberFirstName,
  setEditMemberFirstName,
  editMemberLastName,
  setEditMemberLastName,
  handleEditMember,
}) => {
  if (!showEditModal) {
    return null;
  }
  return (
    <div>
      <h2>Edit Member</h2>
      <input
        type="text"
        value={editMemberFirstName}
        onChange={(e) => setEditMemberFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={editMemberLastName}
        onChange={(e) => setEditMemberLastName(e.target.value)}
        placeholder="Last Name"
      />
      <button type="button" onClick={handleEditMember}>
        Save
      </button>
    </div>
  );
};

EditMemberModal.propTypes = {
  showEditModal: PropTypes.bool.isRequired,
  editMemberId: PropTypes.string.isRequired,
  editMemberFirstName: PropTypes.string.isRequired,
  setEditMemberFirstName: PropTypes.func.isRequired,
  editMemberLastName: PropTypes.string.isRequired,
  setEditMemberLastName: PropTypes.func.isRequired,
  handleEditMember: PropTypes.func.isRequired,
};

export default EditMemberModal;
