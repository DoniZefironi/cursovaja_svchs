import React from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { FaFileDownload, FaPlus, FaMinus, FaEdit, FaTrash, FaUserPlus, FaUsers, FaClipboardList, FaClipboard } from 'react-icons/fa';

const MethodList = ({ methods, handleToggle, openIndex, handleEdit, handleDelete, currentUser, handleDownload, handleCreateUserMethodological, handleViewUserMethodological, handleCreateSpecialityMethodological, handleViewSpecialityMethodological }) => {
  return (
    <div className="content-box list-box">
      {methods.map((method, index) => (
        <div key={index} className='contentiks'>
          <div className="list-item">
            <div>
              <h6>{method.title}</h6>
              <p>{method.author} ({method.university}, {method.year_create})</p>
            </div>
            <div>
              <Button variant="link" onClick={() => handleDownload(method.url)}>
                <FaFileDownload />
              </Button>
            </div>
            <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </Button>
            {currentUser.user.roles.includes("ADMIN") && (
              <>
                <Button variant="primary" className="mx-2" onClick={() => handleCreateUserMethodological(method.id)}>
                  <FaUserPlus />
                </Button>
                <Button variant="info" className="mx-2" onClick={() => handleViewUserMethodological(method.id)}>
                  <FaUsers />
                </Button>
                <Button variant="warning" className="mx-2" onClick={() => handleEdit(method)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(method.id)}>
                  <FaTrash />
                </Button>
                <Button variant="success" className="mx-2" onClick={() => handleCreateSpecialityMethodological(method.id)}>
                  <FaClipboardList />
                </Button>
                <Button variant="primary" className="mx-2" onClick={() => handleViewSpecialityMethodological(method.id)}>
                  <FaClipboard />
                </Button>
              </>
            )}
          </div>
          <Collapse in={openIndex === index}>
            <div className="additional-info">
              <p>{method.description}</p>
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default MethodList;
