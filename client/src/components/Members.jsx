import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MemberModal from './MemberModal';
import MemberList from './MemberList';
import { useMembers } from '../hooks/useMember';
import '../assets/css/member_style.css';

const Members = () => {
  const { loading, error, data, refetch, addMember, updateMember, deleteMember } = useMembers();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSaveMember = async (member) => {
    if (selectedMember) {
      await updateMember({ variables: { ...member, email: selectedMember.email } });
    } else {
      await addMember({ variables: member });
    }
    refetch();
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleEditMember = (email, member) => {
    setSelectedMember({ ...member, email });
    setShowModal(true);
  };

  const handleDeleteMember = async (email) => {
    try {
      await deleteMember({ variables: { email } });
      refetch();
    } catch (error) {
      console.error("Error deleting member:", error.message);
      alert(`Failed to delete member: ${error.message}`);
    }
  };

  const handleShowModal = () => {
    setSelectedMember(null);
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const members = data ? data.members : [];
  const memberEmails = members.map(member => member.email);

  return (
    <div className="members-container right-align">
      <Button className="btn btn-md bg-gradient-primary mb-0 me-1 mt-2 mt-md-0"  onClick={handleShowModal}>
        Add new hubster
      </Button>
      <MemberList members={members} handleEditMember={handleEditMember} handleDeleteMember={handleDeleteMember} />
      <MemberModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        saveMember={handleSaveMember}
        member={selectedMember || {}} // Ensure member is never null
        memberEmails={memberEmails}
      />
    </div>
  );
};

export default Members;
