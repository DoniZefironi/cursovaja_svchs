import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import { Context } from '../../index';
import Search from '../../components/search';
import Report from '../../components/report';
import ViewByAuthor from '../../components/viewbyauthor';
import ViewByDate from '../../components/viewbydate';
import { FaPlus, FaMinus } from 'react-icons/fa';

const SubjectContainer = observer(() => {
  const { subject } = useContext(Context);
  const { subjects, fetchSubjects } = subject;
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='main'>
      <Container className="mt-4">
        <Row className='gapchek'>
          <Col md={8}>
            <div className="content-box list-box width100">
              {subjects && subjects.length > 0 ? (
                subjects.map((item, index) => (
                  <div key={index} className="contentiks">
                    <div className="list-item">
                      <div>
                        <h6>{item.name}</h6>
                      </div>
                      <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                      </Button>
                    </div>
                    <Collapse in={openIndex === index}>
                      <div className="additional-info">
                        <p>{item.description}</p>
                      </div>
                    </Collapse>
                  </div>
                ))
              ) : (
                <p>No subjects available</p>
              )}
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
    </div>
  );
});

export default SubjectContainer;
