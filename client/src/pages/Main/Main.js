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
              <p>В разделе представлены методические рекомендации по разработке учебных материалов, планированию учебного процесса и оценке знаний студентов.</p>
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
                  <p>Этот раздел содержит информацию по различным учебным дисциплинам, их структуре, содержанию и учебным целям для преподавателей.</p>
                  <Button variant="light" className="custom-button">Дисциплины</Button>
                </div>
              </Col>
            </Row>
            <Row className="mb-4 wrap">
            <Col md={8} className="mb-4 wap">
                <div className="content-box">
                  <h3>Учебные планы</h3>
                  <p>В этом разделе вы найдете учебные планы, включающие расписание занятий, планирование курсов и распределение учебного времени.</p>
                  <Button variant="light" className="custom-button">Учебные планы</Button>
                </div>
              </Col>
              <Col md={4} className="mb-4 wap wapnone">
                <div className="content-box-img">
                  <img src={syb} alt="Syllabus" className="img-fluid" />
                </div>
              </Col>
            </Row>
          </Container>

    </div>
  );
};

export default Main;
