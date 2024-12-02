import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './subject.css'
import logo from '../images/logo.png'
import profileicon from '../images/icon.png'
import bib from '../images/biblio.png'
import caf from '../images/cafedra.png'
import geo from '../images/geo.png'
import sms from '../images/sms.png'
import tel from '../images/tel.png'
import unic from '../images/unic.png'

const Subject = () => {
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

export default Subject;