import React, { Fragment, useEffect, useState } from "react";
import { Nav,Navbar } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Edit from "./Edit";
import { useHistory } from "react-router";


const List = () => {
  // dummy row: {customerid:'',customername:'',customersurname:'',email:'',tel:''}
  const [cus, setCus] = useState([]);
  const history = useHistory();
  const login = sessionStorage.getItem('login');
  const userid = sessionStorage.getItem('userid');
  const userstate = sessionStorage.getItem('userstate');

  if(!login){
    history.push("/logout");
  }


  const deleteCus = async id => {
    try {
      const deleteCus = await fetch(`http://localhost:5000/customer/${id}`, {
        method: "DELETE"
      });
      setCus(cus.filter(customer => customer.customerid !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateRow = (customer) => {
    const newCus = cus.filter(item => customer.customerid !== item.customerid);
    setCus([...newCus, customer]);
  }
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/customer");
      const jsonData = await response.json();
      console.log(jsonData);
      setCus(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Surname", "Email", "Tel"];
    const tableRows = cus.map(customer => [
      customer.customername,
      customer.customersurname,
      customer.email,
      customer.tel,
      customer.status
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Customer Infomation", 14, 15);
    doc.save(`report.pdf`);
  };
  return (
    <Fragment>

      <Nav activeKey="/list">
        <Nav.Item>
          <Nav.Link href="/form">Add new customer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/log">Log</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
 
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>email</th>
            <th>Tel</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cus.map(customer => (
            <tr key={customer.customerid}>
              <td>{customer.customername}</td>
              <td>{customer.customersurname}</td>
              <td>{customer.email}</td>
              <td>{customer.tel}</td>
              <td>{customer.status}</td>

               <td>
                <Edit customer={customer} onUpdate={updateRow} />    
              </td> 
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCus(customer.customerid)}
                >
                  Delete
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => generatePDF()}>
        Get PDF
      </button>
    </Fragment>
  );
};
  
export default List;