import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = sessionStorage.getItem('login');
  const userid = sessionStorage.getItem('userid');
  const userstate = sessionStorage.getItem('userstate');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  /*function handleSubmit(event) {
    event.preventDefault();
  }*/

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
        let result=await response.json();
        if(result.login){
          sessionStorage.setItem('login', result.login);
          sessionStorage.setItem('userid', result.user.userid);
          sessionStorage.setItem('userstate', result.user.admin);
          history.push("/form");
          //console.log(result.login,userid,userstate);
        }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />  
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}