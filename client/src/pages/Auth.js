import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../http/userAPI';
import { Context } from "../index";
import { MAIN_ROUTE } from '../utils/consts';

const Auth = () => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const click = async () => {
    try {
      const decodedToken = await login(email, password);
      console.log("Decoded token in Auth component:", decodedToken);
      user.setUser({
        email: decodedToken.email,
        name: decodedToken.name,
        surname: decodedToken.surname,
        roles: decodedToken.roles,
      });
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '300px' }}>
            <Card.Header className="text-center" style={{ backgroundColor: '#003366', color: 'white' }}>
              Авторизация
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3" onClick={click}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
