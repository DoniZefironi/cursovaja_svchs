import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const SyllabusModal = ({ show, onHide, syllabus, handleChange, handleSave, title }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSyllabusName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={syllabus.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </Form.Group>
          <Form.Group controlId="formSyllabusDate" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={syllabus.date}
              onChange={(e) => handleChange(e, 'date')}
            />
          </Form.Group>
          <Form.Group controlId="formSyllabusFile" className="mt-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleChange(e, 'syllfile', true)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SyllabusModal;
