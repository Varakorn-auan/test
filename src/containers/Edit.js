import React, { Fragment, useState } from "react";

const Edit = ({customer, onUpdate}) => {
  // let customer={customerid:'',customername:'',customersurname:'',email:'',tel:''};
  const [name, setName] = useState(customer.customername);
  const [surname, setSurname] = useState(customer.customersurname);
  const [email, setEmail] = useState(customer.email);
  const [tel, setTel] = useState(customer.tel);
  const [status, setStatus] = useState(customer.status);
  const login = sessionStorage.getItem('login');
  const userid = sessionStorage.getItem('userid');
  const userstate = sessionStorage.getItem('userstate');

  //edit description function
  const updateCustomer = async () => {
    try {
      const body = {name,surname,email,tel,status,userid
      };
      const response = await fetch(
        `http://localhost:5000/customer/${customer.customerid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      onUpdate({
        customerid: customer.customerid,
        customername: name,
        customersurname: surname,
        email: email,
        tel: tel,
        status: status
      })
    } catch (err) {
      console.error(err.message);
    }
  };
if(userstate === 'true'){  
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${customer.customerid}`}
      >
        Edit
      </button>
      <div className="modal" id={`id${customer.customerid}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Cus</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label>Surname</label>
              <input
                type="text"
                className="form-control"
                value={surname}
                onChange={e => setSurname(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label>Tel</label>
              <input
                type="integer"
                className="form-control"
                value={tel}
                onChange={e => setTel(e.target.value)}
              />
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                value={status}
                onChange={e => setStatus(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => updateCustomer()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => alert('Closed')}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    );}
else{  
  return (
        <Fragment>
          <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target={`#id${customer.customerid}`}
          >
            Edit
          </button>
    
          <div className="modal" id={`id${customer.customerid}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Cus</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                </div>
    
                <div className="modal-body">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <label>Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label>Tel</label>
                  <input
                    type="integer"
                    className="form-control"
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                  />
                </div>
    
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal"
                    onClick={() => updateCustomer()}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => alert('Closed')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    );}  
};

export default Edit;
