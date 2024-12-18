import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const YearFilter = observer(() => {
  const { method } = useContext(Context);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    if (selectedYear) {
      method.fetchMethodsByYear(selectedYear);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  return (
    <Form.Select onChange={handleYearChange} defaultValue="">
      <option value="" disabled>Выберите год</option>
      {years.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </Form.Select>
  );
});

export default YearFilter;
