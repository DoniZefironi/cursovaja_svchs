import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userlist.css';
import { Context } from '../../index';
import Search from '../../components/searcuser';
import Report from '../../components/report';
import ViewByAuthor from '../../components/viewbyauthor'; // Если это не относится к пользователям, используйте ViewByDate вместо этого.
import { FaPlus, FaMinus } from 'react-icons/fa';

const UserContainer = observer(() => {
  const { subject } = useContext(Context);
  const { users, fetchUsers } = subject;
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    console.log("Calling fetchUsers...");
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    console.log("Users fetched:", users);
  }, [users]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8}>
            <div className="content-box list-box width100">
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <div key={index} className="contentiks">
                    <div className="list-item">
                      <div>
                        <h6>{`${user.surname} ${user.name} ${user.patronymic}`}</h6>
                        <p>Должность: {user.position}</p>
                      </div>
                      <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                      </Button>
                    </div>
                    <Collapse in={openIndex === index}>
                      <div className="additional-info">
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone_number}</p>
                        <p>Role: {user.roles}</p>
                      </div>
                    </Collapse>
                  </div>
                ))
              ) : (
                <p>No users available</p>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="content-box filter-box">
              <Search />
              <div className="filter-section">
                <h5>Просмотр</h5>
                <ViewByAuthor />
              </div>
              <Report />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default UserContainer;
