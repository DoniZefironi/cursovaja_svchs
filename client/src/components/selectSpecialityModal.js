import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const SelectSpecialityModal = ({ show, onHide, specialities, onSelectSpeciality }) => {
  console.log('Rendering Specialities:', specialities); // Логирование данных специальностей
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Выберите специальность</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(specialities) && specialities.length > 0 ? (
          <ListGroup>
            {specialities.map((speciality) => (
              <ListGroup.Item key={speciality.id} action onClick={() => onSelectSpeciality(speciality.id)}>
                {speciality.code} - {speciality.qualification}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Нет доступных специальностей</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectSpecialityModal;
