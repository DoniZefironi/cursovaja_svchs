import React, { useContext, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Context } from '../index';

const SearchSyllabus = () => {
  const { syllabus } = useContext(Context);
  const { setSearchQuery, searchSyllabuses } = syllabus;
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSyllabuses();
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          value={search}
          onChange={handleSearch}
          placeholder="Поиск расписаний"
          aria-label="Поиск расписаний"
          aria-describedby="basic-addon2"
        />
        <Button variant="light" type="submit" id="button-addon2">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchSyllabus;
