import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const SpecialityMethodologicalModal = ({ show, onHide, specialityMethodologicals = [] }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Специальности, прикрепленные к методичке</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(specialityMethodologicals) && specialityMethodologicals.length > 0 ? (
          <ListGroup>
            {specialityMethodologicals.map((sm) => (
              <ListGroup.Item key={sm.id}>{sm.Speciality ? sm.Speciality.name : 'Без имени'} - {sm.Methodological_rec ? sm.Methodological_rec.title : 'Без названия'}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Нет специальностей, прикрепленных к этой методичке</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpecialityMethodologicalModal;
