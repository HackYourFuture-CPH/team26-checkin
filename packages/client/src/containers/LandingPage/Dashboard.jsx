import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import './Dashboard.css';

const Dashboard = () => {
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
      handleError(error);
    }
  };

  const handleEditMember = async () => {
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
      handleError(error);
    }
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
        handleError(error);
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
      handleError(error);
    }
  };

  const handleError = (error) => {
    // Handle error according to your application's requirements
    // For example, you can display an error message to the user
    console.error(error);
    // You can also use a logging service or error tracking tool to log errors
    // logErrorToService(error);
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
              <button
                type="button"
                onClick={() => {
                  setEditMemberId(member.member_id);
                  setEditMemberFirstName(member.first_name);
                  setEditMemberLastName(member.last_name);
                }}
              >
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
      {showAddModal && (
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
      )}
      {editMemberId && (
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
      )}
    </div>
  );
};

export { Dashboard };
