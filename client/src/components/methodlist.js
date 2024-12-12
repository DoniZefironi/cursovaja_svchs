import React from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';

const MethodList = ({ methods, handleToggle, openIndex, handleEdit, handleDelete }) => {
  return (
    <div className="content-box list-box">
      {methods.map((method, index) => (
        <div key={index} className='contentiks'>
          <div className="list-item">
            <div>
              <h6>{method.title}</h6>
              <p>{method.author} ({method.university}, {method.year_create})</p>
            </div>
            <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </Button>
            <Button variant="warning" className="mx-2" onClick={() => handleEdit(method)}>
              <FaEdit />
            </Button>
            <Button variant="danger" onClick={() => handleDelete(method.id)}>
              <FaTrash />
            </Button>
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
