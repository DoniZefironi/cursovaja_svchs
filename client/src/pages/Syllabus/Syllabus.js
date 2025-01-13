import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './syllabus.css';
import { Context } from '../../index';
import SearchSyllabus from '../../components/searchsyllabus';
import ViewByDate from '../../components/viewbydate';
import SyllabusList from '../../components/syllabuslist';
import SyllabusModal from '../../components/syllabusmodal';

const SyllabusContainer = observer(() => {
  const { syllabus, user: currentUser } = useContext(Context);
  const { syllabuses, fetchSyllabuses, createSyllabus, updateSyllabus, deleteSyllabus, downloadSyllabus, currentPage, totalPages } = syllabus;
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSyllabus, setCurrentSyllabus] = useState({ _id: null, name: '', date: '', syllfile: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchSyllabuses(currentPage);
  }, [fetchSyllabuses, currentPage]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append('name', currentSyllabus.name);
    formData.append('date', currentSyllabus.date);
    if (currentSyllabus.syllfile instanceof File) {
      formData.append('syllfile', currentSyllabus.syllfile);
    }

    createSyllabus(formData);
    setShowModal(false);
    setCurrentSyllabus({ _id: null, name: '', date: '', syllfile: '' });
    window.location.reload();  
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append('name', currentSyllabus.name);
    formData.append('date', currentSyllabus.date);
    if (currentSyllabus.syllfile instanceof File) {
      formData.append('syllfile', currentSyllabus.syllfile);
    }

    updateSyllabus(currentSyllabus._id, formData);
    setShowModal(false);
    setCurrentSyllabus({ _id: null, name: '', date: '', syllfile: '' });
    window.location.reload();  
  };

  const handleChange = (e, key, isFile = false) => {
    const value = isFile ? e.target.files[0] : e.target.value;
    setCurrentSyllabus({ ...currentSyllabus, [key]: value });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchSyllabuses(newPage);
    }
  };

  const handleSave = () => {
    if (editMode) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8}>
            <SyllabusList
              syllabuses={syllabuses}
              currentUser={currentUser}
              handleToggle={handleToggle}
              openIndex={openIndex}
              setCurrentSyllabus={setCurrentSyllabus}
              setShowModal={setShowModal}
              setEditMode={setEditMode}
              handleDelete={deleteSyllabus}
              handleDownload={downloadSyllabus}
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
          <Col md={4}>
            <div className="content-box filter-box">
              <SearchSyllabus />
              <div className="filter-section">
                <h5>Просмотр</h5>
                <ViewByDate />
              </div>
              {currentUser.user.roles.includes("ADMIN") && (
                <>
                <h5>Создать учебный план</h5>
                          <Button variant="light" onClick={() => { setEditMode(false); setShowModal(true); }}>Создать</Button>
                </>
        )}
            </div>
          </Col>
        </Row>
      </Container>

      <SyllabusModal
        show={showModal}
        onHide={() => setShowModal(false)}
        syllabus={currentSyllabus}
        handleChange={handleChange}
        handleSave={handleSave}
        title={editMode ? 'Редактировать запись' : 'Создать новую запись'}
      />
    </div>
  );
});

export default SyllabusContainer;
