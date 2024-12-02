import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Form, InputGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './method.css'
import logo from '../images/logo.png'
import profileicon from '../images/icon.png'
import bib from '../images/biblio.png'
import caf from '../images/cafedra.png'
import geo from '../images/geo.png'
import sms from '../images/sms.png'
import tel from '../images/tel.png'
import unic from '../images/unic.png'
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
            <Navbar style={{ backgroundColor: '#2B579A' }} variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" className="link-a">
                        <img
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Логотип"
                        />{' '}
                        ПОИТ
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto"> 
                            <Nav.Link href="#disciplines" className="link-p">Дисциплины</Nav.Link>
                            <Nav.Link href="#recommendations" className="link-p">Методические рекомендации</Nav.Link>
                            <Nav.Link href="#plans" className="link-p">Учебные планы</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto"> 
                            <Nav.Link href="#profile">
                                <img
                                src={profileicon}
                                width="55"
                                height="50"
                                className="d-inline-block align-top"
                                alt="Иконка профиля"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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
          <footer style={{ backgroundColor: '#2B579A' }} className="text-white text-center py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Полезные ссылки</h5>
              <ul className="list-unstyled">
              <li><a href="#link1" className="text-white"><img src={unic} alt="Report" className="img-fluid" /></a></li>
                <li><a href="#link2" className="text-white"><img src={caf} alt="Report" className="img-fluid" /></a></li>
                <li><a href="#link3" className="text-white"><img src={bib} alt="Report" className="img-fluid" /></a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Быстрые ссылки</h5>
              <ul className="list-unstyled">
                <li><a href="#link3" className="text-white">Отчет</a></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Контакты</h5>
              <div className="blockimg">
              <img src={geo} alt="Report" className="img-fluid" />
              <a>г. Могилев, ул. Ленинская 89, ауд. 322, корпус №2</a>
              </div>
              <div className="blockimg">
              <img src={tel} alt="Report" className="img-fluid" />
              <a> +375-22-629-447</a>
              </div>
              <div className="blockimg">
              <img src={sms} alt="Report" className="img-fluid" />
              <a>poit@bru.by</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

    </div>
    );
};

export default Method;