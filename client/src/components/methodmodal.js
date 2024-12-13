import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const MethodModal = ({ show, onHide, method, handleChange, handleSave, title, subjects, typeMethods }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMethodTitle">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              value={method.title}
              onChange={(e) => handleChange(e, 'title')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodDescription" className="mt-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Введите описание"
              value={method.description}
              onChange={(e) => handleChange(e, 'description')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodLanguage" className="mt-3">
            <Form.Label>Язык</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите язык"
              value={method.language}
              onChange={(e) => handleChange(e, 'language')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodYearCreate" className="mt-3">
            <Form.Label>Год создания</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите год создания"
              value={method.year_create}
              onChange={(e) => handleChange(e, 'year_create')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodDateRealese" className="mt-3">
            <Form.Label>Дата выпуска</Form.Label>
            <Form.Control
              type="date"
              placeholder="Введите дату выпуска"
              value={method.date_realese}
              onChange={(e) => handleChange(e, 'date_realese')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodFile" className="mt-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleChange(e, 'url', true)}
            />
          </Form.Group>
          <Form.Group controlId="formMethodQuantityPages" className="mt-3">
            <Form.Label>Количество страниц</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите количество страниц"
              value={method.quantity_pages}
              onChange={(e) => handleChange(e, 'quantity_pages')}
            />
          </Form.Group>
          <Form.Group controlId="formMethodSubject" className="mt-3">
            <Form.Label>Предмет</Form.Label>
            <Form.Control
              as="select"
              value={method.subjectId}
              onChange={(e) => handleChange(e, 'subjectId')}
            >
              <option value="">Выберите предмет</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMethodTypeMethod" className="mt-3">
            <Form.Label>Тип методики</Form.Label>
            <Form.Control
              as="select"
              value={method.TypeMethodId}
              onChange={(e) => handleChange(e, 'TypeMethodId')}
            >
              <option value="">Выберите тип методики</option>
              {typeMethods.map(typeMethod => (
                <option key={typeMethod.id} value={typeMethod.id}>{typeMethod.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSave}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MethodModal;
