import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './method.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import MethodList from '../../components/methodlist';
import MethodModal from '../../components/methodmodal';
import UserMethodologicalModal from '../../components/userMethodologicalModal';
import SelectUserModal from '../../components/selectUserModal';
import SelectSpecialityModal from '../../components/selectSpecialityModal';
import SpecialityMethodologicalModal from '../../components/specialityMethodologicalModal';
import FilterBox from '../../components/filterbox';
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
    console.log('Specialities:', toJS(specialities));
}, [fetchMethods, fetchSubjects, fetchTypeMethods, fetchUsers, fetchSpecialities, currentPage]);

  const specialitiesArray = toJS(specialities);

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
    // window.location.reload();  
  };

  const handleEdit = () => {
    const formData = new FormData();
    for (const key in currentMethod) {
      formData.append(key, currentMethod[key]);
    }
    if (file) {
      formData.append('file', file);
    }
    updateMethod(currentMethod._id, formData);
    setShowEditModal(false);
    setCurrentMethod({ title: '', description: '', language: '', year_create: '', date_realese: '', file: '', quantity_pages: '', subjectId: '', TypeMethodId: '' });
    setFile(null);
    window.location.reload();  
  };

  const handleDelete = (_id) => {
    deleteMethod(_id);
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
  };

  const handleSelectUser = (userId) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('methodologicalId', selectedMethodId);
    createUserMethodological(formData)
      .then(() => {
        setShowSelectUserModal(false);
        setSelectedMethodId(null);
      })
      .catch(error => {
        console.error('Error creating UserMethodological:', error);
      });
};


const handleViewUserMethodological = async (methodId) => {
  try {
    const userMethodologicals = await fetchUserMethodologicals();

    // Проверяем, что userMethodologicals является массивом
    if (!Array.isArray(userMethodologicals)) {
      throw new TypeError('Expected userMethodologicals to be an array');
    }

    const filteredUserMethodologicals = userMethodologicals.filter((um) => um.methodologicalRecId === methodId);
    setUserMethodologicals(filteredUserMethodologicals);
    setShowUserMethodModal(true);
  } catch (error) {
    console.error('Error fetching or filtering UserMethodological:', error);
  }
};


  const handleCreateSpecialityMethodological = (methodId) => {
    setSelectedMethodId(methodId);
    setShowSelectSpecialityModal(true);
  };

  const handleSelectSpeciality = (specialityId) => {
    const formData = { specialityId: parseInt(specialityId, 10), methodologicalRecId: parseInt(selectedMethodId, 10) };
    createSpecialityMethodological(formData);
    setShowSelectSpecialityModal(false);
    setSelectedMethodId(null);
};

const handleViewSpecialityMethodological = async (methodId, specialityId) => {
  const specialityMethodologicals = await fetchSpecialityMethodologicals();
  const filteredSpecialityMethodologicals = specialityMethodologicals.filter((sm) => sm.methodologicalRecId === methodId);

  const enhancedData = await Promise.all(
    filteredSpecialityMethodologicals.map(async (sm) => {
      const speciality = specialities.find(s => s.id === sm.specialityId) || {};
      const methodologicalRec = methods.find(m => m.id === sm.methodologicalRecId) || {};
      return {
        ...sm,
        Speciality: speciality,
        Methodological_rec: methodologicalRec,
      };
    })
  );

  setSpecialityMethodologicals(enhancedData);
  setShowSpecialityMethodModal(true);
};


  const userId = currentUser.user.id;
  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8} className=''>
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
          <FilterBox
            search={search}
            setSearch={setSearch}
            handleSearchSubmit={handleSearchSubmit}
            userId={userId}
            currentUser={currentUser}
            setShowCreateModal={setShowCreateModal}
          />
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
      specialities={specialitiesArray} 
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
