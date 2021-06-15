import React, { Fragment, useEffect, useState } from "react";
import { Nav,Navbar } from "react-bootstrap";
import { useHistory } from "react-router";


const Log = () => {
  const [cus, setCus] = useState([]);
  const history = useHistory();
  const login = sessionStorage.getItem('login');
  const userid = sessionStorage.getItem('userid');
  const userstate = sessionStorage.getItem('userstate');

  if(!login){
    history.push("/logout");
  }

  const updateRow = (logging) => {
    const newLog = cus.filter(item => logging.logid !== item.logid);
    setCus([...newLog, logging]);
  }
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/log");
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>

      <Nav activeKey="/list">
        <Nav.Item>
          <Nav.Link href="/form">Add new customer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/list">List Customer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
 
      <table className="table mt-5">
        <thead>
          <tr>
            <th>userid</th>
            <th>Date</th>
            <th>Process</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody>
          {cus.map(logging => (
            <tr key={logging.logid}>
              <td>{logging.userid}</td>
              <td>{logging.date}</td>
              <td>{logging.process}</td>
              <td>{logging.log}</td>       
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
  
export default Log;