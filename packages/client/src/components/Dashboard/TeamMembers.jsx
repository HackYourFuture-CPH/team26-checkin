/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import { AddTeamMemberModal } from '../../containers/LandingPage/AddTeamMemberModal';
import { Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberFirstName, setEditMemberFirstName] = useState('');
  const [editMemberLastName, setEditMemberLastName] = useState('');
  const [newMemberFirstName, setNewMemberFirstName] = useState('');
  const [newMemberLastName, setNewMemberLastName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${apiURL()}/teamMembers`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMember = (id) => {
    setEditMemberId(id);
    const memberToEdit = teamMembers.find((member) => member.member_id === id);
    setEditMemberFirstName(memberToEdit.first_name);
    setEditMemberLastName(memberToEdit.last_name);
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this team member?',
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${apiURL()}/teamMembers/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete team member');
        }
        setTeamMembers((prevMembers) =>
          prevMembers.filter((member) => member.member_id !== id),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch(`${apiURL()}/teamMembers/addMember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: newMemberFirstName,
          last_name: newMemberLastName,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add team member');
      }
      fetchTeamMembers();
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${apiURL()}/teamMembers/${editMemberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: editMemberFirstName,
          last_name: editMemberLastName,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit team member');
      }
      fetchTeamMembers();
      setEditMemberId(null);
      setEditMemberFirstName('');
      setEditMemberLastName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="team-members-container">
      <div className="team-members-heading-container">
        <Typography className="teamMembers-heading" variant="h6">
          Team Members
        </Typography>
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={() => setShowAddModal(true)}
        >
          Add Team Member
        </Button>
      </div>
      <div className="add-member">
        <AddTeamMemberModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          newMemberFirstName={newMemberFirstName}
          setNewMemberFirstName={setNewMemberFirstName}
          newMemberLastName={newMemberLastName}
          setNewMemberLastName={setNewMemberLastName}
          handleAddMember={handleAddMember}
        />
      </div>

      {editMemberId && (
        <div className="edit-member-container">
          <Typography variant="body1">Edit Member</Typography>
          <div className="edit-member-details">
            <div className="input-container">
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
            </div>
            <div className="button-container">
              <button
                className="save-button"
                type="button"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={() => setEditMemberId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <ul>
          {teamMembers.map((member) => (
            <li key={member.member_id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                  {member.first_name} {member.last_name}
                </div>
                <div>
                  <IconButton
                    onClick={() => handleEditMember(member.member_id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteMember(member.member_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TeamMembers };
