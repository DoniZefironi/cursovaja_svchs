import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserMethodologicalModal = ({ show, onHide, userMethodologicals = [] }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Пользователи, прикрепленные к методичке</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userMethodologicals.length > 0 ? (
          <ul>
            {userMethodologicals.map((um) => (
              <li key={um.id}>{um.user ? `${um.user.name} ${um.user.surname}` : 'Без имени'} - {um.methodological_rec ? um.methodological_rec.title : 'Без названия'}</li>
            ))}
          </ul>
        ) : (
          <p>Нет пользователей, прикрепленных к этой методичке.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserMethodologicalModal;
