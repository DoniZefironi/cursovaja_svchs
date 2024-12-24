import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userlist.css';
import { Context } from '../../index';
import Search from '../../components/searcuser';
import Report from '../../components/report';
import UserList from '../../components/userlist';
import UserModal from '../../components/usermodal';
import UserModalCreate from '../../components/usermodalcreate';

const UserContainer = observer(() => {
  const { author, user: currentUser } = useContext(Context); 
  const { users, fetchUsers, createUser, updateUser, currentPage, totalPages } = author;
  const [openIndex, setOpenIndex] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUserEdit, setCurrentUserEdit] = useState({ id: null, name: '', surname: '', patronymic: '', email: '', phone_number: '', position: '', roles: '' });
  const [newUser, setNewUser] = useState({ name: '', surname: '', patronymic: '', email: '', phone_number: '', position: '', roles: '', password: '' });

  useEffect(() => {
    console.log("Calling fetchUsers...");
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  useEffect(() => {
    console.log("Users fetched:", users);
  }, [users]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCreate = () => {
    createUser(
        newUser.email,
        newUser.password,
        newUser.name,
        newUser.surname,
        newUser.patronymic,
        newUser.phone_number,
        newUser.position,
        newUser.roles
    );
    setShowCreateModal(false);
    setNewUser({ name: '', surname: '', patronymic: '', email: '', phone_number: '', position: '', roles: '', password: '' });
    window.location.reload();  
};


const handleEdit = () => {
    updateUser(
        currentUserEdit.id,
        currentUserEdit.name,
        currentUserEdit.surname,
        currentUserEdit.patronymic,  
        currentUserEdit.email,
        currentUserEdit.phone_number,
        currentUserEdit.position,
        currentUserEdit.roles
    );
    setShowEditModal(false);
    setCurrentUserEdit({ id: null, name: '', surname: '', patronymic: '', email: '', phone_number: '', position: '', roles: '' });
    window.location.reload(); 
};

  const handleChange = (e, key, isNew = false) => {
    const value = e.target.value;
    if (isNew) {
      setNewUser({ ...newUser, [key]: value });
    } else {
      setCurrentUserEdit({ ...currentUserEdit, [key]: value });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchUsers(newPage);
    }
  };

  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8}>
            <UserList
              users={users}
              currentUser={currentUser}
              handleToggle={handleToggle}
              openIndex={openIndex}
              setCurrentUserEdit={setCurrentUserEdit}
              setShowEditModal={setShowEditModal}
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
              <Search />
              {currentUser.user.roles.includes("ADMIN") && ( 
                <>
                <h5>Создать преподавателя</h5>
                          <Button variant="light" onClick={() => setShowCreateModal(true)}>Создать</Button>
                </>
        )}
            </div>
          </Col>
        </Row>
      </Container>

      <UserModalCreate
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        user={newUser}
        handleChange={(e, key) => handleChange(e, key, true)}
        handleSave={handleCreate}
        title="Создать новую запись"
      />

      <UserModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={currentUserEdit}
        handleChange={(e, key) => handleChange(e, key)}
        handleSave={handleEdit}
        title="Редактировать запись"
      />
    </div>
  );
});

export default UserContainer;
