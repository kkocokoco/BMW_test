import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import MemberModal from './MemberModal';
import '../assets/css/member_style.css';

const GET_MEMBERS = gql`
  query GetMembers {
    members {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;

const ADD_MEMBER = gql`
  mutation AddMember($email: String!, $imageUrl: String!, $fullname: String!, $role: String!, $address: String!) {
    addMember(email: $email, imageUrl: $imageUrl, fullname: $fullname, role: $role, address: $address) {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation UpdateMember($id: ID!, $email: String, $imageUrl: String, $fullname: String, $role: String, $address: String) {
    updateMember(id: $id, email: $email, imageUrl: $imageUrl, fullname: $fullname, role: $role, address: $address) {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation DeleteMember($id: ID!) {
    deleteMember(id: $id)
  }
`;

const Members = () => {
  const { loading, error, data, refetch } = useQuery(GET_MEMBERS);
  const [addMember] = useMutation(ADD_MEMBER);
  const [updateMember] = useMutation(UPDATE_MEMBER);
  const [deleteMember] = useMutation(DELETE_MEMBER);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSaveMember = async (member) => {
    if (selectedMember) {
      await updateMember({ variables: { ...member, id: selectedMember.id } });
    } else {
      await addMember({ variables: member });
    }
    refetch();
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleEditMember = (id, member) => {
    setSelectedMember({ ...member, id });
    setShowModal(true);
  };

  const handleDeleteMember = async (id) => {
    await deleteMember({ variables: { id } });
    refetch();
  };

  const handleShowModal = () => {
    setSelectedMember(null);
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const members = data.members;
  console.log(members);
  return (
    <div className="members-container">
      <Button variant="primary" onClick={handleShowModal}>
        Add Member
      </Button>
      <div className="row">
        {members.map((member, index) => (
          <div key={member.id} className="col-lg-6 col-12">
            <div className="card card-profile mt-4">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12 mt-n5">
                  <a href="javascript:;">
                    <div className="p-3 pe-md-0">
                      <img className="w-100 border-radius-md shadow-lg" src={`http://localhost:6001/uploads/team-1.jpg`} alt={member.fullname} />
                    </div>
                  </a>
                </div>
                <div className="col-lg-8 col-md-6 col-12 my-auto">
                  <div className="card-body ps-lg-0">
                    <h5 className="mb-0">{member.fullname}</h5>
                    <h6 className="text-info">{member.role}</h6>
                    <p className="mb-0">{member.email}</p>
                    <p className="mb-0">{member.address}</p>
                    <button className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" onClick={() => handleEditMember(member.id, member)}>
                      Edit
                    </button>
                    <button className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" onClick={() => handleDeleteMember(member.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MemberModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        saveMember={handleSaveMember}
        member={selectedMember}
      />
    </div>
  );
};

export default Members;
