import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamMemberListItem = ({
  member,
  handleEditMember,
  handleDeleteMember,
}) => {
  return (
    <li key={member.member_id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          {member.first_name} {member.last_name}
        </div>
        <div>
          <IconButton onClick={() => handleEditMember(member.member_id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteMember(member.member_id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};

TeamMemberListItem.propTypes = {
  member: PropTypes.shape({
    member_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  handleEditMember: PropTypes.func.isRequired,
  handleDeleteMember: PropTypes.func.isRequired,
};

export default TeamMemberListItem;
