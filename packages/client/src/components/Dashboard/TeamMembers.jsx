import React, { useEffect, useState, useCallback } from 'react';
import { apiURL } from '../../apiURL';
import { AddTeamMemberModal } from '../../containers/LandingPage/AddTeamMemberModal';
import { Typography, Button } from '@mui/material';
import TeamMemberListItem from './TeamMemberListItem';
import EditingMember from './EditingMember'; // Import the newly created component
import { useTeamIdContext } from '../../hooks/contextHook';

const TeamMembers = () => {
  const { teamId } = useTeamIdContext();
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberFirstName, setEditMemberFirstName] = useState('');
  const [editMemberLastName, setEditMemberLastName] = useState('');
  const [newMemberFirstName, setNewMemberFirstName] = useState('');
  const [newMemberLastName, setNewMemberLastName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL()}/teamMembers/${teamId}/members`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error(error);
    }
  }, [teamId]); // Include teamId in the dependency array for useCallback

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]); // Include fetchTeamMembers in the dependency array for useEffect

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
        const response = await fetch(
          `${apiURL()}/teamMembers/${teamId}/members/${id}`,
          {
            method: 'DELETE',
          },
        );
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
    if (!newMemberFirstName || !newMemberLastName) {
      alert('Please enter both first name and last name.');
      return;
    }
    try {
      const response = await fetch(
        `${apiURL()}/teamMembers/${teamId}/members`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: newMemberFirstName,
            last_name: newMemberLastName,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to add team member');
      }
      fetchTeamMembers();
      setShowAddModal(false);
      setNewMemberFirstName('');
      setNewMemberLastName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(
        `${apiURL()}/teamMembers/${teamId}/members/${editMemberId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: editMemberFirstName,
            last_name: editMemberLastName,
          }),
        },
      );
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
          size="big"
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
        <EditingMember
          editMemberId={editMemberId}
          editMemberFirstName={editMemberFirstName}
          editMemberLastName={editMemberLastName}
          setEditMemberFirstName={setEditMemberFirstName}
          setEditMemberLastName={setEditMemberLastName}
          handleEditSave={handleEditSave}
          setEditMemberId={setEditMemberId}
        />
      )}

      <div>
        <ul>
          {teamMembers.map((member) => (
            <TeamMemberListItem
              key={member.member_id}
              member={member}
              handleEditMember={handleEditMember}
              handleDeleteMember={handleDeleteMember}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TeamMembers };
