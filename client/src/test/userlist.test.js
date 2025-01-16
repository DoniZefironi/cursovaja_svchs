import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserList from '../components/userlist'; // Убедитесь, что путь правильный

const users = [
  { surname: 'Ivanov', name: 'Ivan', patronymic: 'Ivanovich', position: 'Engineer', email: 'ivan@example.com', phone_number: '123456789', roles: ['USER'] },
  { surname: 'Petrov', name: 'Petr', patronymic: 'Petrovich', position: 'Manager', email: 'petr@example.com', phone_number: '987654321', roles: ['ADMIN'] }
];

const currentUser = { user: { roles: ['ADMIN'] } };

const handleToggle = jest.fn();
const setCurrentUserEdit = jest.fn();
const setShowEditModal = jest.fn();

describe('UserList Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <UserList
        users={users}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentUserEdit={setCurrentUserEdit}
        setShowEditModal={setShowEditModal}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with correct user information', () => {
    const { getByText, queryByText } = render(
      <UserList
        users={users}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentUserEdit={setCurrentUserEdit}
        setShowEditModal={setShowEditModal}
      />
    );

    // Проверка наличия пользователей
    expect(getByText('Ivanov Ivan Ivanovich')).toBeInTheDocument();
    expect(getByText('Должность: Engineer')).toBeInTheDocument();
    expect(getByText('Petrov Petr Petrovich')).toBeInTheDocument();
    expect(getByText('Должность: Manager')).toBeInTheDocument();

    // Проверка наличия кнопок
    expect(queryByText('No users available')).not.toBeInTheDocument();
  });

  it('handles toggle correctly', () => {
    const { getAllByRole } = render(
      <UserList
        users={users}
        currentUser={currentUser}
        handleToggle={handleToggle}
        openIndex={null}
        setCurrentUserEdit={setCurrentUserEdit}
        setShowEditModal={setShowEditModal}
      />
    );

    // Проверка вызова handleToggle
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(handleToggle).toHaveBeenCalledWith(0);
  });

  it('shows and hides additional information on toggle', () => {
    const { getByText, queryByText, rerender } = render(
        <UserList
            users={users}
            currentUser={currentUser}
            handleToggle={handleToggle}
            openIndex={-1} // Начальное скрытое состояние
            setCurrentUserEdit={setCurrentUserEdit}
            setShowEditModal={setShowEditModal}
        />
    );

    // Проверка начального состояния
    expect(queryByText('Email: ivan@example.com')).not.toBeVisible();
    expect(queryByText('Email: petr@example.com')).not.toBeInTheDocument();

    // Обновляем рендеринг компонента с openIndex = 0
    rerender(
        <UserList
            users={users}
            currentUser={currentUser}
            handleToggle={handleToggle}
            openIndex={0} // Открываем первый элемент
            setCurrentUserEdit={setCurrentUserEdit}
            setShowEditModal={setShowEditModal}
        />
    );

    // Проверка состояния после обновления
    expect(getByText('Email: ivan@example.com')).toBeInTheDocument();
    expect(queryByText('Email: petr@example.com')).not.toBeInTheDocument();

    // Скрываем информацию снова
    rerender(
        <UserList
            users={users}
            currentUser={currentUser}
            handleToggle={handleToggle}
            openIndex={-1} // Скрываем информацию
            setCurrentUserEdit={setCurrentUserEdit}
            setShowEditModal={setShowEditModal}
        />
    );

    // Проверка состояния после скрытия
    expect(queryByText('Email: ivan@example.com')).not.toBeInTheDocument();
    expect(queryByText('Email: petr@example.com')).not.toBeInTheDocument();
});
});
