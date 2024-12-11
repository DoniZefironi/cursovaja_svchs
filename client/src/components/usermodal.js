import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserModal = ({ show, onHide, user, handleChange, handleSave, title }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              value={user.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </Form.Group>
          <Form.Group controlId="formUserSurname" className="mt-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите фамилию"
              value={user.surname}
              onChange={(e) => handleChange(e, 'surname')}
            />
          </Form.Group>
          <Form.Group controlId="formUserPatronymic" className="mt-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите отчество"
              value={user.patronymic}
              onChange={(e) => handleChange(e, 'patronymic')}
            />
          </Form.Group>
          <Form.Group controlId="formUserEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={user.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </Form.Group>
          <Form.Group controlId="formUserPhone" className="mt-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер телефона"
              value={user.phone_number}
              onChange={(e) => handleChange(e, 'phone_number')}
            />
          </Form.Group>
          <Form.Group controlId="formUserPosition" className="mt-3">
            <Form.Label>Должность</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите должность"
              value={user.position}
              onChange={(e) => handleChange(e, 'position')}
            />
          </Form.Group>
          <Form.Group controlId="formUserRole" className="mt-3">
            <Form.Label>Роль</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите роль"
              value={user.roles}
              onChange={(e) => handleChange(e, 'roles')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSave}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
