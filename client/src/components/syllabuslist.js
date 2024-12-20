import React from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { FaFileDownload, FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const SyllabusList = ({ syllabuses, handleEdit, handleDelete, handleToggle, openIndex, setCurrentSyllabus, setShowModal, setEditMode, handleDownload, currentUser }) => {
  const isAdmin = currentUser?.user?.roles?.includes("ADMIN") || false;

  return (
    <div className="content-box list-box width100">
      {syllabuses && syllabuses.length > 0 ? (
        syllabuses.map((syllabus, index) => (
          <div key={index} className="contentiks">
            <div className="list-item">
              <div>
                <h6>{syllabus.name}</h6>
                <p>{new Date(syllabus.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className='iconochke'>
              <div>
                <Button variant="link" onClick={() => handleDownload(syllabus.syllfile)}>
                  <FaFileDownload />
                </Button>
              </div>
              {isAdmin && (
                <>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setCurrentSyllabus(syllabus);
                      setShowModal(true);
                      setEditMode(true);
                    }}
                    className="mx-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(syllabus.id)}
                  >
                    <FaTrash />
                  </Button>
                </>
              )}
              <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </Button>
              </div>
            </div>
            <Collapse in={openIndex === index}>
              <div className="additional-info">
                <p>{syllabus.syllfile}</p>
              </div>
            </Collapse>
          </div>
        ))
      ) : (
        <p>No syllabuses available</p>
      )}
    </div>
  );
};

export default SyllabusList;