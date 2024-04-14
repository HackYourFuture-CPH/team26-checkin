import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './Dashboard.css';
import { AddTeamMemberModal } from './AddTeamMemberModal';
import { EditMemberModal } from './EditMemberModal';

const Dashboard = () => {
  const { teamCode } = useParams(); // This matches the URL parameter
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberFirstName, setEditMemberFirstName] = useState('');
  const [editMemberLastName, setEditMemberLastName] = useState('');
  const [newMemberFirstName, setNewMemberFirstName] = useState('');
  const [newMemberLastName, setNewMemberLastName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiURL()}/teamMembers/${teamCode}/members`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  }, [teamCode]);

  useEffect(() => {
    fetchTeamMembers();
  }, [teamCode, fetchTeamMembers]);

  const handleEditClick = (member) => {
    setEditMemberId(member.member_id);
    setEditMemberFirstName(member.first_name);
    setEditMemberLastName(member.last_name);
    setShowEditModal(true);
  };

  const handleEditMember = async () => {
    try {
      const response = await fetch(
        `${apiURL()}/teamMembers/${teamCode}/members/${editMemberId}`,
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
      setShowEditModal(false);
      setEditMemberId(null);
      setEditMemberFirstName('');
      setEditMemberLastName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this team member?',
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${apiURL()}/teamMembers/${teamCode}/members/${id}`,
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
        console.error('Error:', error);
      }
    }
  };

  const handleAddMember = async () => {
    try {
      const response = await fetch(
        `${apiURL()}/teamMembers/${teamCode}/members`,
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
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member) => (
            <li key={member.member_id}>
              {member.first_name} {member.last_name}
              <button type="button" onClick={() => handleEditClick(member)}>
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteMember(member.member_id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={() => setShowAddModal(true)}>
        Add Team Member
      </button>
      <AddTeamMemberModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newMemberFirstName={newMemberFirstName}
        setNewMemberFirstName={setNewMemberFirstName}
        newMemberLastName={newMemberLastName}
        setNewMemberLastName={setNewMemberLastName}
        handleAddMember={handleAddMember}
      />
      <EditMemberModal
        showEditModal={showEditModal}
        editMemberId={editMemberId}
        editMemberFirstName={editMemberFirstName}
        setEditMemberFirstName={setEditMemberFirstName}
        editMemberLastName={editMemberLastName}
        setEditMemberLastName={setEditMemberLastName}
        handleEditMember={handleEditMember}
      />
    </div>
  );
};

export { Dashboard };
