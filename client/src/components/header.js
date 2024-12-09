import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import logo from '../images/logo.png';
import profileicon from '../images/icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Main/main.css';
import { LOGIN_ROUTE, MAIN_ROUTE, METHOD_ROUTE, SUBJECT_ROUTE, SYLLABUS_ROUTE, USERLIST_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { logout } from '../http/userAPI';

const Header = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    console.log("Current user email:", user.user.email);
    console.log("Current user name:", user.user.name);
    console.log("Current user surname:", user.user.surname);
    console.log("Current user roles:", user.user.roles);

    const handleLogout = async () => {
        await logout();
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    };

    return (
        <Navbar style={{ backgroundColor: '#2B579A' }} variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={MAIN_ROUTE} className="link-a">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Логотип"
                    />{' '}
                    ПОИТ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to={SUBJECT_ROUTE} className="link-p">Дисциплины</Nav.Link>
                        <Nav.Link as={Link} to={METHOD_ROUTE} className="link-p">Методические рекомендации</Nav.Link>
                        <Nav.Link as={Link} to={SYLLABUS_ROUTE} className="link-p">Учебные планы</Nav.Link>
                    </Nav>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" id="dropdown-profile">
                            <img
                                src={profileicon}
                                width="55"
                                height="50"
                                className="d-inline-block align-top"
                                alt="Иконка профиля"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.ItemText>Email: {user.user.email}</Dropdown.ItemText>
                            <Dropdown.ItemText>Имя: {user.user.name}</Dropdown.ItemText>
                            <Dropdown.ItemText>Фамилия: {user.user.surname}</Dropdown.ItemText>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Выйти</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {user.user.roles && user.user.roles.includes("ADMIN") && (
                        <Button variant="outline-light" as={Link} to={USERLIST_ROUTE} className="ml-2">Список пользователей</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;
