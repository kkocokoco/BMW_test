import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../assets/css/member_style.css';

const MemberModal = ({ show, handleClose, saveMember, member, memberEmails = [] }) => {  // Default value for memberEmails
  const [formState, setFormState] = useState({
    email: '',
    imageUrl: '',
    fullname: '',
    role: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (member) {
      setFormState(member);
    }
    // Clear errors when the modal is opened
    setErrors({});
  }, [member, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState) {
      newErrors.general = 'Form state is not properly initialized';
    } else {
      if (!formState.email) newErrors.email = 'Email is required';
      else if (memberEmails.includes(formState.email) && (!member || formState.email !== member.email)) {
        newErrors.email = 'Email already exists';
      }
      if (!formState.imageUrl) newErrors.imageUrl = 'Image URL is required';
      if (!formState.fullname) newErrors.fullname = 'Full name is required';
      if (!formState.role) newErrors.role = 'Role is required';
      if (!formState.address) newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveMember(formState);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal-header-custom" closeButton>
        <Modal.Title>{member ? 'EDIT MEMBER' : 'ADD MEMBER'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(errors).length > 0 && (
          <Alert variant="danger">
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
              className="input-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="file"
              name="imageUrl"
              onChange={handleChange}
              isInvalid={!!errors.imageUrl}
              required
              className="input-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              value={formState.fullname}
              onChange={handleChange}
              isInvalid={!!errors.fullname}
              required
              className="input-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formState.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
              required
              className="input-custom"
            />
            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <input
              className="form-control mb-sm-0 input-custom"
              type="text"
              name="address"
              value={formState.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>
          <div className="modal-buttons">
            <Button className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0"  onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn btn-sm bg-gradient-primary mb-0 me-1 mt-2 mt-md-0"  type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MemberModal;
