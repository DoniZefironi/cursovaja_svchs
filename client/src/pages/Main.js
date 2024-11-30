import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import logo from '../images/logo.png'
import profileicon from '../images/icon.png'
import met from '../images/met.png'
import sub from '../images/subject.png'
import syb from '../images/syllabus.png'

const Main = () => {
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
          <Row className="mb-4">
          <Col md={8} className="mb-4">
            <div className="content-box">
              <h3>Методические рекомендации</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <Button variant="light" className="custom-button">Рекомендации</Button>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="content-box-img">
              <img src={met} alt="Recommendation" className="img-fluid rounded" />
            </div>
          </Col>
        </Row>
            <Row className="mb-4">
            <Col md={4} className="mb-4">
                <div className="content-box-img">
                  <img src={sub} alt="Disciplines" className="img-fluid" />
                </div>
              </Col>
              <Col md={8} className="mb-4">
                <div className="content-box">
                  <h3>Дисциплины</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <Button variant="light" className="custom-button">Дисциплины</Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
            <Col md={8} className="mb-4">
                <div className="content-box">
                  <h3>Учебные планы</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <Button variant="light" className="custom-button">Учебные планы</Button>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="content-box-img">
                  <img src={syb} alt="Report" className="img-fluid" />
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
                <li><a href="#link1" className="text-white"><FaUniversity /> Link 1</a></li>
                <li><a href="#link2" className="text-white"><FaBuilding /> Link 2</a></li>
                <li><a href="#link3" className="text-white"><FaChalkboardTeacher /> Link 3</a></li>
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
              <p><FaMapMarkerAlt /> г. Могилев, ул. Ленинская 89, ауд. 322, корпус №2</p>
              <p><FaPhone /> +375-22-629-447</p>
              <p><FaEnvelope /> poit@bru.by</p>
            </Col>
          </Row>
        </Container>
      </footer>

    </div>
  );
};

export default Main;