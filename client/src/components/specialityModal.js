import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SpecialityModal = ({ show, onHide, speciality, handleChange, handleSave }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать специальность</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formSpecialityCode">
            <Form.Label>Код</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите код"
              name="code"
              value={speciality.code}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpecialityName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              name="name"
              value={speciality.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpecialityDescription">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите описание"
              name="description"
              value={speciality.description}
              onChange={handleChange}
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

export default SpecialityModal;
