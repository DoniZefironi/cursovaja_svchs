import React from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { FaFileDownload, FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';

const MethodList = ({ methods, handleToggle, openIndex, handleEdit, handleDelete, currentUser, handleDownload }) => {
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
                <Button variant="warning" className="mx-2" onClick={() => handleEdit(method)}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(method.id)}>
                  <FaTrash />
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
