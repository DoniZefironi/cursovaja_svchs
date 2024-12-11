import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

const UserList = ({ users, currentUser, handleToggle, openIndex, setCurrentUserEdit, setShowEditModal }) => {
  return (
    <div className="content-box list-box width100">
      {users && users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="contentiks">
            <div className="list-item">
              <div>
                <h6>{`${user.surname} ${user.name} ${user.patronymic}`}</h6>
                <p>Должность: {user.position}</p>
              </div>
              <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </Button>
              {currentUser.user.roles.includes("ADMIN") && (
                <Button
                  variant="warning"
                  onClick={() => {
                    setCurrentUserEdit(user);
                    setShowEditModal(true);
                  }}
                >
                  Изменить
                </Button>
              )}
            </div>
            <Collapse in={openIndex === index}>
              <div className="additional-info">
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone_number}</p>
                <p>Role: {user.roles}</p>
              </div>
            </Collapse>
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default UserList;
