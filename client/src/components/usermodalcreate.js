import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserModalCreate = ({ show, onHide, user, handleChange, handleSave, title }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCreateUserName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              value={user.name}
              onChange={(e) => handleChange(e, 'name', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserSurname" className="mt-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите фамилию"
              value={user.surname}
              onChange={(e) => handleChange(e, 'surname', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserPatronymic" className="mt-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите отчество"
              value={user.patronymic}
              onChange={(e) => handleChange(e, 'patronymic', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={user.email}
              onChange={(e) => handleChange(e, 'email', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserPhone" className="mt-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер телефона"
              value={user.phone_number}
              onChange={(e) => handleChange(e, 'phone_number', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserPosition" className="mt-3">
            <Form.Label>Должность</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите должность"
              value={user.position}
              onChange={(e) => handleChange(e, 'position', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserRole" className="mt-3">
            <Form.Label>Роль</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите роль"
              value={user.roles}
              onChange={(e) => handleChange(e, 'roles', true)}
            />
          </Form.Group>
          <Form.Group controlId="formCreateUserPassword" className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={user.password}
              onChange={(e) => handleChange(e, 'password', true)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSave}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModalCreate;
