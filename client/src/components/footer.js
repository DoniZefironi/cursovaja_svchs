import React from 'react';
import bib from '../images/biblio.png'
import caf from '../images/cafedra.png'
import geo from '../images/geo.png'
import sms from '../images/sms.png'
import tel from '../images/tel.png'
import unic from '../images/unic.png'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Main/main.css';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#2B579A' }} className="text-white text-center py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Полезные ссылки</h5>
              <ul className="list-unstyled">
              <li><a href="http://bru.by/" className="text-white"><img src={unic} alt="Report" className="img-fluid" /></a></li>
                <li><a href="http://bru.by/content/departments/softinformtechnology" className="text-white"><img src={caf} alt="Report" className="img-fluid" /></a></li>
                <li><a href="http://biblio.bru.by/" className="text-white"><img src={bib} alt="Report" className="img-fluid" /></a></li>
              </ul>
            </Col>
            <Col md={4}>
            <h5>Контакты</h5>
            <div className="blockimg">
              <a href="https://maps.google.com?q=г.+Могилев,+ул.+Ленинская+89,+ауд.+322,+корпус+№2" target="_blank" rel="noopener noreferrer">
                <img src={geo} alt="Report" className="img-fluid" />
              </a>
              <a href="https://maps.google.com?q=г.+Могилев,+ул.+Ленинская+89,+ауд.+322,+корпус+№2" target="_blank" rel="noopener noreferrer">
                г. Могилев, ул. Ленинская 89, ауд. 322, корпус №2
              </a>
            </div>
            <div className="blockimg">
              <a href="tel:+37522629447">
                <img src={tel} alt="Report" className="img-fluid" />
              </a>
              <a href="tel:+37522629447">+375-22-629-447</a>
            </div>
            <div className="blockimg">
              <a href="mailto:poit@bru.by">
                <img src={sms} alt="Report" className="img-fluid" />
              </a>
              <a href="mailto:poit@bru.by">poit@bru.by</a>
            </div>
          </Col>

          </Row>
        </Container>
      </footer>
    )
}
export default Footer;