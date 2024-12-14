import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Collapse, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import { Context } from '../../index';
import Search from '../../components/search';
import Report from '../../components/report';
import ViewByAuthor from '../../components/viewbyauthor';
import ViewByDate from '../../components/viewbydate';
import { FaPlus, FaMinus } from 'react-icons/fa';

const SubjectContainer = observer(() => {
  const { subject, user } = useContext(Context);
  const { subjects, fetchSubjects, createSubject, updateSubject, currentPage, totalPages, setPage } = subject;
  const [openIndex, setOpenIndex] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({ id: null, name: '', description: '' });
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchSubjects(currentPage);
  }, [fetchSubjects, currentPage]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    createSubject(newSubject.name, newSubject.description);
    setShowCreateModal(false);
    setNewSubject({ name: '', description: '' });
  };

  const handleEdit = () => {
    updateSubject(currentSubject.id, currentSubject.name, currentSubject.description);
    setShowEditModal(false);
    setCurrentSubject({ id: null, name: '', description: '' });
    window.location.reload();  // Перезагрузка страницы после успешного обновления
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
        {user.user.roles.includes("ADMIN") && ( // Проверяем, что пользователь является администратором
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>Создать</Button>
        )}
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
                        <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                          {openIndex === index ? <FaMinus /> : <FaPlus />}
                        </Button>
                        {user.user.roles.includes("ADMIN") && ( // Проверяем, что пользователь является администратором
                          <Button
                            variant="warning"
                            onClick={() => {
                              setCurrentSubject(item);
                              setShowEditModal(true);
                            }}
                          >
                            Изменить
                          </Button>
                        )}
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
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </Col>
          <Col md={4}>
            <div className="content-box filter-box">
              <Search />
              <div className="filter-section">
                <h5>Просмотр</h5>
                <ViewByAuthor />
                <ViewByDate />
              </div>
              <Report />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Модальное окно для создания новой записи */}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Закрыть</Button>
          <Button variant="primary" onClick={handleCreate}>Создать</Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для редактирования записи */}
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
