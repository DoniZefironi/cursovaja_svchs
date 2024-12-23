import React from 'react';
import { Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import YearFilter from './yearfilter';
import Report from './report';

const FilterBox = ({ search, setSearch, handleSearchSubmit, userId, currentUser, setShowCreateModal }) => {
  return (
    <Col md={4}>
      <div className="content-box filter-box">
        <Form onSubmit={handleSearchSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <YearFilter />
        </div>
        <Report userId={userId} />
        {currentUser.user.roles.includes("ADMIN") && (
          <>
            <h5>Создать методическую рекомендацию</h5>
            <Button variant="light" onClick={() => setShowCreateModal(true)}>Создать</Button>
          </>
        )}
      </div>
    </Col>
  );
};

export default FilterBox;