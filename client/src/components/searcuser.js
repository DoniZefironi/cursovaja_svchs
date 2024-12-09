import React, { useContext, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Context } from '../index';

const SearchUser = () => {
  const { subject } = useContext(Context);
  const { setUserSearchQuery, searchUsers } = subject;
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setUserSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchUsers();
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          value={search}
          onChange={handleSearch}
          placeholder="Поиск пользователей"
          aria-label="Поиск пользователей"
          aria-describedby="basic-addon2"
        />
        <Button variant="light" type="submit" id="button-addon2">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchUser;
