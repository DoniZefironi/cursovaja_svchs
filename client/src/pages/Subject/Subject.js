import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Button, Form, InputGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css';
import { FaSearch, FaPlus, FaMinus } from 'react-icons/fa';
import { Context } from '../../index';

const Subject = observer(() => {
  const { subject } = useContext(Context);
  console.log("Context:", Context);
  console.log("Subject store from context:", subject);

  const { subjects, fetchSubjects, searchSubjects, setSearchQuery } = subject;
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  useEffect(() => {
    console.log("Subjects from MobX store:", subjects);
  }, [subjects]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSubjects();
  };

  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <div className="content-box list-box">
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
              <Form onSubmit={handleSearchSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={search}
                    onChange={handleSearch}
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
    </div>
  );
});

export default Subject;
