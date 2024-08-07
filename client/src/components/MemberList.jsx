import React from 'react';
import MemberItem from './MemberItem';

const MemberList = ({ members, handleEditMember, handleDeleteMember }) => (
  <div className="row">
    {members.map(member => (
      <MemberItem key={member.id} member={member} handleEditMember={handleEditMember} handleDeleteMember={handleDeleteMember} />
    ))}
  </div>
);

export default MemberList;
