import React from 'react';
import '../assets/css/member_style.css';

const MemberItem = ({ member, handleEditMember, handleDeleteMember }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL; // Ensure this is set correctly
  console.log(process.env.REACT_APP_SERVER_URL);

  return (
    <div className="col-lg-6 col-12">
      <div className="card card-profile mt-4">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-4 mt-n5">
            <a href="#">
              <div className="p-3 pe-md-0">
                <img 
                  className="w-100 border-radius-md shadow-lg" 
                  src={`${serverUrl}/uploads/${member.imageUrl}`} 
                  alt={member.fullname} 
                />
              </div>
            </a>
          </div>
          <div className="col-lg-8 col-md-8 col-8 my-auto">
            <div className="card-body ps-lg-0 tx-left">
              <h5 className="mb-0">{member.fullname}</h5>
              <h6 className="text-info">{member.role}</h6>
              <p className="mb-0">{member.email}, {member.address}</p>
              <button 
                className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" 
                onClick={() => handleEditMember(member.email, member)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0" 
                onClick={() => handleDeleteMember(member.email)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
