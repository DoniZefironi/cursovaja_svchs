import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import met from '../../images/met.png'
import sub from '../../images/subject.png'
import syb from '../../images/syllabus.png'

const Main = () => {
    return (
        <div>
          <Container className="mt-4 main">
          <Row className="mb-4 wrap">
          <Col md={8} className="mb-4 wap">
            <div className="content-box">
              <h3>Методические рекомендации</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <Button variant="light" className="custom-button">Рекомендации</Button>
            </div>
          </Col>
          <Col md={4} className="mb-4 wap wapnone">
            <div className="content-box-img">
              <img src={met} alt="Recommendation" className="img-fluid rounded" />
            </div>
          </Col>
        </Row>
            <Row className="mb-4 wrap">
            <Col md={4} className="mb-4 wap wapnone">
                <div className="content-box-img">
                  <img src={sub} alt="Disciplines" className="img-fluid" />
                </div>
              </Col>
              <Col md={8} className="mb-4 wap">
                <div className="content-box">
                  <h3>Дисциплины</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <Button variant="light" className="custom-button">Дисциплины</Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-4 wrap">
            <Col md={8} className="mb-4 wap">
                <div className="content-box">
                  <h3>Учебные планы</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <Button variant="light" className="custom-button">Учебные планы</Button>
                </div>
              </Col>
              <Col md={4} className="mb-4 wap wapnone">
                <div className="content-box-img">
                  <img src={syb} alt="Report" className="img-fluid" />
                </div>
              </Col>
            </Row>
          </Container>

    </div>
  );
};

export default Main;