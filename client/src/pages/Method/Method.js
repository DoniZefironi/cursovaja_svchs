import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './method.css';
import { FaSearch } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import MethodList from '../../components/methodlist';
import MethodModal from '../../components/methodmodal';
import UserMethodologicalModal from '../../components/userMethodologicalModal';
import SelectUserModal from '../../components/selectUserModal';
import SelectSpecialityModal from '../../components/selectSpecialityModal';
import SpecialityMethodologicalModal from '../../components/specialityMethodologicalModal';
import YearFilter from '../../components/yearfilter'
import { toJS } from 'mobx';
const MethodContainer = observer(() => {
  const { method, user: currentUser, author, specialityMethod } = useContext(Context);

  if (!method) {
    return <div>Loading...</div>;
  }

  const { methods, fetchMethods, createMethod, updateMethod, deleteMethod, searchMethods, setSearchQuery, currentPage, totalPages, subjects, typeMethods, fetchSubjects, fetchTypeMethods, downloadMethod, createUserMethodological, fetchUserMethodologicals } = method;
  const { users, fetchUsers } = author;
  const { specialities, fetchSpecialities, createSpecialityMethodological, fetchSpecialityMethodologicals } = specialityMethod;

  const [openIndex, setOpenIndex] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserMethodModal, setShowUserMethodModal] = useState(false);
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);
  const [showSelectSpecialityModal, setShowSelectSpecialityModal] = useState(false);
  const [showSpecialityMethodModal, setShowSpecialityMethodModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState({ title: '', description: '', language: '', year_create: '', date_realese: '', file: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  const [newMethod, setNewMethod] = useState({ title: '', description: '', language: '', year_create: '', date_realese: '', file: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
  const [search, setSearch] = useState('');
  const [file, setFile] = useState(null);
  const [userMethodologicals, setUserMethodologicals] = useState([]);
  const [specialityMethodologicals, setSpecialityMethodologicals] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  useEffect(() => {
      fetchMethods(currentPage);
      fetchSubjects();
      fetchTypeMethods();
      fetchUsers();
      fetchSpecialities(); 
  }, [fetchMethods, fetchSubjects, fetchTypeMethods, fetchUsers, fetchSpecialities, currentPage]);
  
  console.log('Specialities before conversion:', specialities);
  const specialitiesArray = toJS(specialities);
  console.log('Specialities after conversion:', specialitiesArray);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    const formData = new FormData();
    for (const key in newMethod) {
      formData.append(key, newMethod[key]);
    }
    if (file) {
      formData.append('file', file);
    }
    createMethod(formData);
    setShowCreateModal(false);
    setNewMethod({ title: '', description: '', language: '', year_create: '', date_realese: '', file: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
    setFile(null);
    window.location.reload();  
  };

  const handleEdit = () => {
    const formData = new FormData();
    for (const key in currentMethod) {
      formData.append(key, currentMethod[key]);
    }
    if (file) {
      formData.append('file', file);
    }
    updateMethod(currentMethod.id, formData);
    setShowEditModal(false);
    setCurrentMethod({ title: '', description: '', language: '', year_create: '', date_realese: '', file: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
    setFile(null);
    window.location.reload();  
  };

  const handleDelete = (id) => {
    deleteMethod(id);
    window.location.reload();  
  };

  const handleChange = (e, key, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewMethod({ ...newMethod, [key]: value });
    } else {
      setCurrentMethod({ ...currentMethod, [key]: value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

  const handleCreateUserMethodological = (methodId) => {
    setSelectedMethodId(methodId);
    setShowSelectUserModal(true);
    window.location.reload();  
  };

  const handleSelectUser = (userId) => {
    const formData = { userId: parseInt(userId, 10), methodologicalId: parseInt(selectedMethodId, 10) };
    console.log('Sending data to server:', formData);
    createUserMethodological(formData);
    setShowSelectUserModal(false);
    setSelectedMethodId(null);
  };

  const handleViewUserMethodological = async (methodId) => {
    const userMethodologicals = await fetchUserMethodologicals();
    const filteredUserMethodologicals = userMethodologicals.filter((um) => um.methodologicalRecId === methodId);
    setUserMethodologicals(filteredUserMethodologicals);
    setShowUserMethodModal(true);
  };

  const handleCreateSpecialityMethodological = (methodId) => {
    setSelectedMethodId(methodId);
    setShowSelectSpecialityModal(true);
    window.location.reload();  
  };

  const handleSelectSpeciality = (specialityId) => {
    const formData = { specialityId: parseInt(specialityId, 10), methodologicalRecId: parseInt(selectedMethodId, 10) };
    console.log('Sending data to server:', formData); 
    createSpecialityMethodological(formData);
    setShowSelectSpecialityModal(false);
    setSelectedMethodId(null);
};

  const handleViewSpecialityMethodological = async (methodId) => {
    const specialityMethodologicals = await fetchSpecialityMethodologicals();
    const filteredSpecialityMethodologicals = specialityMethodologicals.filter((sm) => sm.methodologicalRecId === methodId);
    setSpecialityMethodologicals(filteredSpecialityMethodologicals);
    setShowSpecialityMethodModal(true);
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
              handleDownload={downloadMethod}
              handleCreateUserMethodological={handleCreateUserMethodological}
              handleViewUserMethodological={handleViewUserMethodological}
              handleCreateSpecialityMethodological={handleCreateSpecialityMethodological}
              handleViewSpecialityMethodological={handleViewSpecialityMethodological}
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
                <YearFilter />
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
        handleFileChange={handleFileChange}
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
        handleFileChange={handleFileChange}
        handleSave={handleEdit}
        title="Редактировать запись"
        subjects={subjects}
        typeMethods={typeMethods}
      />

      <UserMethodologicalModal
        show={showUserMethodModal}
        onHide={() => setShowUserMethodModal(false)}
        userMethodologicals={userMethodologicals}
      />

      <SelectUserModal
        show={showSelectUserModal}
        onHide={() => setShowSelectUserModal(false)}
        users={users}
        onSelectUser={handleSelectUser}
      />

<SelectSpecialityModal
      show={showSelectSpecialityModal}
      onHide={() => setShowSelectSpecialityModal(false)}
      specialities={specialitiesArray} // Преобразование данных из Proxy
      onSelectSpeciality={handleSelectSpeciality}
  />
  
      <SpecialityMethodologicalModal
        show={showSpecialityMethodModal}
        onHide={() => setShowSpecialityMethodModal(false)}
        specialityMethodologicals={specialityMethodologicals}
      />
    </div>
  );
});

export default MethodContainer;
