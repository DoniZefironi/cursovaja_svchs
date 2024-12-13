import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './method.css';
import { FaSearch } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import MethodList from '../../components/methodlist';
import MethodModal from '../../components/methodmodal';

const MethodContainer = observer(() => {
  const { method, user: currentUser } = useContext(Context);

  if (!method) {
    return <div>Loading...</div>;
  }

  const { methods, fetchMethods, createMethod, updateMethod, deleteMethod, searchMethods, setSearchQuery, currentPage, totalPages, subjects, typeMethods, fetchSubjects, fetchTypeMethods } = method;
  
  const [openIndex, setOpenIndex] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState({ title: '', description: '', language: '', year_create: '', date_realese: '', url: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  const [newMethod, setNewMethod] = useState({ title: '', description: '', language: '', year_create: '', date_realese: '', url: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMethods(currentPage);
    fetchSubjects();
    fetchTypeMethods();
  }, [fetchMethods, fetchSubjects, fetchTypeMethods, currentPage]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    console.log("Creating new method:", newMethod);
    createMethod(newMethod);
    setShowCreateModal(false);
    setNewMethod({ title: '', description: '', language: '', year_create: '', date_realese: '', url: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  };

  const handleEdit = () => {
    updateMethod(currentMethod.id, currentMethod);
    setShowEditModal(false);
    setCurrentMethod({ title: '', description: '', language: '', year_create: '', date_realese: '', url: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  };

  const handleDelete = (id) => {
    deleteMethod(id);
  };

  const handleChange = (e, key, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewMethod({ ...newMethod, [key]: value });
    } else {
      setCurrentMethod({ ...currentMethod, [key]: value });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    searchMethods();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchMethods(newPage);
    }
  };

  return (
    <div className='main'>
      <Container className="mt-4">
      {currentUser.user.roles.includes("ADMIN") && (
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>Создать</Button>
      )}
        <Row className='gapchek'>
          <Col md={8}>
            <MethodList
              methods={methods}
              handleToggle={handleToggle}
              currentUser={currentUser}
              openIndex={openIndex}
              handleEdit={(method) => {
                setCurrentMethod(method);
                setShowEditModal(true);
              }}
              handleDelete={handleDelete}
            />
            <div className="pagination-controls">
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
              <Form onSubmit={handleSearchSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск"
                    aria-label="Поиск"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="light" type="submit" id="button-addon2">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form>
              <div className="filter-section">
                <h5>Просмотр</h5>
                <Form.Select className="mb-3">
                  <option>Автору</option>
                </Form.Select>
                <Form.Select>
                  <option>Дате публикации</option>
                </Form.Select>
              </div>
              <div className="report-section mt-3">
                <h5>Отчет</h5>
                <Button variant="light" className="download-button">Скачать</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <MethodModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        method={newMethod}
        handleChange={(e, key) => handleChange(e, key, true)}
        handleSave={handleCreate}
        title="Создать новую запись"
        subjects={subjects}
        typeMethods={typeMethods}
      />

      <MethodModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        method={currentMethod}
        handleChange={handleChange}
        handleSave={handleEdit}
        title="Редактировать запись"
        subjects={subjects}
        typeMethods={typeMethods}
      />
    </div>
  );
});

export default MethodContainer;
