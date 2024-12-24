import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const SpecialityMethodologicalModal = ({ show, onHide, specialityMethodologicals = [] }) => {
  console.log('SpecialityMethodologicals:', specialityMethodologicals); // Логируем данные

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Специальности, прикрепленные к методичке</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(specialityMethodologicals) && specialityMethodologicals.length > 0 ? (
          <ListGroup>
            {specialityMethodologicals.map((sm) => {
              console.log('Speciality:', sm.Speciality); // Логируем специальность
              console.log('Methodological_rec:', sm.Methodological_rec); // Логируем методичку
              return (
                <ListGroup.Item key={sm.id}>
                  {sm?.Speciality?.code || 'Специальность отсутствует'} - 
                  {sm?.Methodological_rec?.title || 'Методичка отсутствует'}
                </ListGroup.Item>
              );
            })}
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
