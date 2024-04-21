import React from 'react';
import { Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const EditingMember = ({
  editMemberId,
  editMemberFirstName,
  editMemberLastName,
  setEditMemberFirstName,
  setEditMemberLastName,
  handleEditSave,
  setEditMemberId,
}) => {
  return (
    <div className="edit-member-container">
      <Typography variant="body1" className="edit-member-heading">
        Edit Member
      </Typography>
      <div className="edit-member-details">
        <div className="input-container">
          <TextField
            className="edit-member-input"
            size="small"
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            value={editMemberFirstName}
            onChange={(e) => setEditMemberFirstName(e.target.value)}
            placeholder="First Name"
          />
          <TextField
            className="edit-member-input"
            size="small"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            value={editMemberLastName}
            onChange={(e) => setEditMemberLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="button-container">
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setEditMemberId(null)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the EditingMember component
EditingMember.propTypes = {
  editMemberId: PropTypes.number.isRequired,
  editMemberFirstName: PropTypes.string.isRequired,
  editMemberLastName: PropTypes.string.isRequired,
  setEditMemberFirstName: PropTypes.func.isRequired,
  setEditMemberLastName: PropTypes.func.isRequired,
  handleEditSave: PropTypes.func.isRequired,
  setEditMemberId: PropTypes.func.isRequired,
};

export default EditingMember;
