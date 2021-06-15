const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.post("/users", async (req, res) => {
  try {
    const { email,password } = req.body;
    const cus = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", 
    [email,password]
    );
    let check={
      login:cus.rowCount===1,
      user:cus.rows?.[0]
    }
    res.json(check);
  } catch (err) {
    console.error(err.message);
  }
});

//add customer
app.post("/customer", async (req, res) => {
  try {
    const { name,surname,email,tel,status } = req.body;
    const newcus = await pool.query(
      "INSERT INTO customer (customername,customersurname,email,tel,status) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [name,surname,email,tel,status]
    );

    res.json(newcus.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all customer
app.get("/customer", async (req, res) => {
  try {
    const allcustomer = await pool.query("SELECT * FROM customer");
    res.json(allcustomer.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//update
app.put("/customer/:id", async (req, res) => {
  try {
    const { name,surname,email,tel,status } = req.body;
    const { id } = req.params;
    const updateinfo = await pool.query(
      "UPDATE customer SET customername = $1,customersurname = $2,email =$3,tel= $4,status= $5 WHERE customerid = $6",
      [name,surname,email,tel,status,id]
    );

    res.json("Customer was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//delete
app.delete("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteinfo = await pool.query("DELETE FROM customer WHERE customerid = $1", 
    [ id ]
    );
    res.json("Customer was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });