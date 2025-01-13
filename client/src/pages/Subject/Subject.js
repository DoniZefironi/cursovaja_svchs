import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Collapse, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import { Context } from '../../index';
import Search from '../../components/search';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';

const SubjectContainer = observer(() => {
  const { subject, syllabus, user } = useContext(Context);
  const { subjects, fetchSubjects, createSubject, updateSubject, currentPage, totalPages, setPage } = subject;
  const { syllabuses, fetchAllSyllabuses } = syllabus;
  const [openIndex, setOpenIndex] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({ _id: null, name: '', description: '', syllabusId: '' });
  const [newSubject, setNewSubject] = useState({ name: '', description: '', syllabusId: '' });

  useEffect(() => {
    fetchSubjects(currentPage);
    fetchAllSyllabuses();
  }, [fetchSubjects, fetchAllSyllabuses, currentPage]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    createSubject(newSubject.name, newSubject.description, newSubject.syllabusId);
    setShowCreateModal(false);
    setNewSubject({ name: '', description: '', syllabusId: '' });
    window.location.reload();
  };

  const handleEdit = () => {
    updateSubject(currentSubject._id, currentSubject.name, currentSubject.description, currentSubject.syllabusId);
    setShowEditModal(false);
    setCurrentSubject({ _id: null, name: '', description: '', syllabusId: '' });
    window.location.reload();
  };

  const handleChange = (e, key, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewSubject({ ...newSubject, [key]: value });
    } else {
      setCurrentSubject({ ...currentSubject, [key]: value });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      fetchSubjects(newPage);
    }
  };

  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8}>
            <div className="content-box list-box width100">
              {subjects && subjects.length > 0 ? (
                <>
                  {subjects.map((item, index) => (
                    <div key={index} className="contentiks">
                      <div className="list-item">
                        <div>
                          <h6>{item.name}</h6>
                        </div>
                        <div className='iconochke'>
                        <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                          {openIndex === index ? <FaMinus /> : <FaPlus />}
                        </Button>
                        {user.user.roles.includes("ADMIN") && ( 
                          <Button
                            variant="warning"
                            onClick={() => {
                              setCurrentSubject(item);
                              setShowEditModal(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                        )}
                        </div>
                      </div>
                      <Collapse in={openIndex === index}>
                        <div className="additional-info">
                          <p>{item.description}</p>
                        </div>
                      </Collapse>
                    </div>
                  ))}
                </>
              ) : (
                <p>No subjects available</p>
              )}
            </div>
            <div className="pagination-controls mt-3">
              <Button
              style={{backgroundColor : "#2B579A"}}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                пред.
              </Button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <Button
              style={{backgroundColor : "#2B579A"}}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                след.
              </Button>
            </div>
          </Col>
          <Col md={4}>
            <div className="content-box filter-box">
              <Search />
              {user.user.roles.includes("ADMIN") && ( 
                <>
                <h5>Создать дисциплину</h5>
                          <Button variant="light" onClick={() => setShowCreateModal(true)}>Создать</Button>
                </>
        )}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Создать новую запись</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCreateSubjectName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={newSubject.name}
                onChange={(e) => handleChange(e, 'name', true)}
              />
            </Form.Group>
            <Form.Group controlId="formCreateSubjectDescription" className="mt-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={newSubject.description}
                onChange={(e) => handleChange(e, 'description', true)}
              />
            </Form.Group>
            <Form.Group controlId="formCreateSyllabus" className="mt-3">
              <Form.Label>Силлабус</Form.Label>
              <Form.Control
                as="select"
                value={newSubject.syllabusId}
                onChange={(e) => handleChange(e, 'syllabusId', true)}
              >
                <option value="">Выберите силлабус</option>
                {syllabuses && syllabuses.map((syllabus) => (
                  <option key={syllabus.id} value={syllabus.id}>{syllabus.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Закрыть</Button>
          <Button variant="primary" onClick={handleCreate}>Создать</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать запись</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditSubjectName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={currentSubject.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </Form.Group>
            <Form.Group controlId="formEditSubjectDescription" className="mt-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={currentSubject.description}
                onChange={(e) => handleChange(e, 'description')}
              />
            </Form.Group>
            <Form.Group controlId="formEditSyllabus" className="mt-3">
              <Form.Label>Силлабус</Form.Label>
              <Form.Control
                as="select"
                value={currentSubject.syllabusId}
                onChange={(e) => handleChange(e, 'syllabusId')}
              >
                <option value="">Выберите силлабус</option>
                {syllabuses && syllabuses.map((syllabus) => (
                  <option key={syllabus.id} value={syllabus.id}>{syllabus.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Закрыть</Button>
          <Button variant="primary" onClick={handleEdit}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default SubjectContainer;
