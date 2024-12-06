import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../images/logo.png';
import profileicon from '../images/icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Main/main.css';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, METHOD_ROUTE, SUBJECT_ROUTE, SYLLABUS_ROUTE } from '../utils/consts';
import { Context } from '../index';

const Header = observer(() => {
    const { user } = useContext(Context);

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
                    {user.isAdmin ? (
                        <>
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="#profile">
                                    <img
                                        src={profileicon}
                                        width="55"
                                        height="50"
                                        className="d-inline-block align-top"
                                        alt="Иконка профиля"
                                    />
                                </Nav.Link>
                            </Nav>
                            <Button variant="outline-light" as={Link} to={ADMIN_ROUTE}>Админ</Button>
                            <Button variant="outline-light" as={Link} to={LOGIN_ROUTE} className="ml-2">Выйти</Button>
                        </>
                    ) : (
                        <>
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="#profile">
                                    <img
                                        src={profileicon}
                                        width="55"
                                        height="50"
                                        className="d-inline-block align-top"
                                        alt="Иконка профиля"
                                    />
                                </Nav.Link>
                            </Nav>
                            <Button variant="outline-light" as={Link} to={LOGIN_ROUTE} className="ml-2">Выйти</Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default Header;
