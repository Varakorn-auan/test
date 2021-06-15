import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./Form.css";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router";

export default function Info() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [status, setStatus] = useState("");
  const login = sessionStorage.getItem('login');
  const userid = sessionStorage.getItem('userid');
  const userstate = sessionStorage.getItem('userstate');

  if(!login){
    history.push("/logout");
  }

  function validateForm() {
    return name.length > 0 && surname.length > 0;
  }
  /*function handleSubmit(event) {
    event.preventDefault();
  }*/

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = { name,surname,email,tel,status };
      const response = await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });   
    } catch (err) {
      console.error(err.message);
    }
  };
if(userstate === 'true'){  
  return (
    <div className="Info">
      <Nav activeKey="/list">
        <Nav.Item>
          <Nav.Link href="/list">List Customer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/log">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />  
        </Form.Group>
        <Form.Group size="lg" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />  
        </Form.Group>
        <Form.Group size="lg" controlId="Tel">
          <Form.Label>Tel</Form.Label>
          <Form.Control
            type="integer"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />  
        </Form.Group>
        <Form.Group size="lg" controlId="Status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />  
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );}
  else{
    return(
    <div className="Info">
    <Nav activeKey="/list">
      <Nav.Item>
        <Nav.Link href="/list">List Customer</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link href="/log">Log</Nav.Link>
        </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
    <Form onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="Surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />  
      </Form.Group>
      <Form.Group size="lg" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />  
      </Form.Group>
      <Form.Group size="lg" controlId="Tel">
        <Form.Label>Tel</Form.Label>
        <Form.Control
          type="integer"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />  
      </Form.Group>
      <Button block size="lg" type="submit" disabled={!validateForm()}>
        Submit
      </Button>
    </Form>
  </div>
    );}
};