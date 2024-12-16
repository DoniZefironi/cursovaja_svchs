import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SelectUserModal = ({ show, onHide, users, onSelectUser }) => {
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedUserId) {
      onSelectUser(selectedUserId);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Выберите пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="selectUser">
          <Form.Label>Пользователь</Form.Label>
          <Form.Control as="select" value={selectedUserId} onChange={handleSelectChange}>
            <option value="" disabled>Выберите пользователя</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name} {user.surname}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSubmit}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectUserModal;
