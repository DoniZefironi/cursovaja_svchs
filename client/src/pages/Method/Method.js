import React, { useState } from 'react';
import { Container, Row, Col, Button,  Form, InputGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './method.css'
import {  FaSearch, FaPlus, FaMinus } from 'react-icons/fa';

const Method = () => {
    const items = [
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 },
        { title: "Бизнес-анализ и проектирование ПО", author: "Вайнилович, Ю. В.", university: "Белорусско-Российский университет", year: 2024 }
      ];
    
      const [openIndex, setOpenIndex] = useState(null);
    
      const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
    return (
                <div>
            
            <Container className="mt-4">
      <Row>
        <Col md={8}>
          <div className="content-box list-box">
            {items.map((item, index) => (
              <div key={index} className='contentiks'>
                <div className="list-item">
                  <div>
                    <h6>{item.title}</h6>
                    <p>{item.author} ({item.university}, {item.year})</p>
                  </div>
                  <Button variant="light" className="plus-button" onClick={() => handleToggle(index)}>
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </Button>
                </div>
                <Collapse in={openIndex === index}>
                  <div className="additional-info">
                    <p>Дополнительная информация о курсе.</p>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <div className="content-box filter-box">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="basic-addon2"
              />
              <Button variant="light" id="button-addon2">
                <FaSearch />
              </Button>
            </InputGroup>
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
};

export default Method;