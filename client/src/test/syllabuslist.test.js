import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SyllabusList from '../components/syllabuslist'; // Убедитесь, что путь правильный
import { FaFileDownload, FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const syllabuses = [
  { id: 1, name: 'Syllabus 1', date: '2023-01-15', syllfile: 'file1.pdf' },
  { id: 2, name: 'Syllabus 2', date: '2023-02-20', syllfile: 'file2.pdf' }
];

const currentUser = { user: { roles: ['ADMIN'] } };

const handleEdit = jest.fn();
const handleDelete = jest.fn();
const handleToggle = jest.fn();
const handleDownload = jest.fn();
const setCurrentSyllabus = jest.fn();
const setShowModal = jest.fn();
const setEditMode = jest.fn();

describe('SyllabusList Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with correct syllabus information', () => {
    const { getByText, queryByText } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка наличия расписаний
    expect(getByText('Syllabus 1')).toBeInTheDocument();
    expect(getByText('15 Jan 2023')).toBeInTheDocument();
    expect(getByText('Syllabus 2')).toBeInTheDocument();
    expect(getByText('20 Feb 2023')).toBeInTheDocument();

    // Проверка наличия кнопок
    expect(queryByText('No syllabuses available')).not.toBeInTheDocument();
  });

  it('handles toggle correctly', () => {
    const { getAllByRole } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка вызова handleToggle
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  it('shows and hides additional information on toggle', () => {
    const { getByText, queryByText, rerender } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка начального состояния
    expect(queryByText('file1.pdf')).not.toBeInTheDocument();
    expect(queryByText('file2.pdf')).not.toBeInTheDocument();

    // Обновляем рендеринг компонента с openIndex = 0
    rerender(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={0}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка состояния после обновления
    expect(getByText('file1.pdf')).toBeInTheDocument();
    expect(queryByText('file2.pdf')).not.toBeInTheDocument();
  });

  it('handles download correctly', () => {
    const { getAllByRole } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка вызова handleDownload
    const downloadButton = getAllByRole('button', { name: /download/i })[0];
    fireEvent.click(downloadButton);
    expect(handleDownload).toHaveBeenCalledWith('file1.pdf');
  });

  it('handles edit and delete correctly', () => {
    const { getAllByRole } = render(
      <SyllabusList
        syllabuses={syllabuses}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentSyllabus={setCurrentSyllabus}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    );

    // Проверка вызова handleEdit
    const editButton = getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);
    expect(setCurrentSyllabus).toHaveBeenCalledWith(syllabuses[0]);
    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setEditMode).toHaveBeenCalledWith(true);

    // Проверка вызова handleDelete
    const deleteButton = getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
