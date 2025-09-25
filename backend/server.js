const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",   
  password: "",  
  database: "react_node_crud"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("MySQL Connected!");
});

// Example route: create student
app.post("/students", (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO students 
    (slno, registrationNo, name, gender, fatherName, fatherMobileNumber, dob, mobile, email, address, city, state, nation, pincode, campus, college, degree, course, batch, branch, className, section, aadhar, hostler) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(sql, [
    data.slno,
    data.registrationNo,
    data.name,
    data.gender,
    data.fatherName,
    data.fatherMobileNumber,
    data.dob,
    data.mobile,
    data.email,
    data.address,
    data.city,
    data.state,
    data.nation,
    data.pincode,
    data.campus,
    data.college,
    data.degree,
    data.course,
    data.batch,
    data.branch,
    data.className,
    data.section,
    data.aadhar,
    data.hostler
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student added!", id: result.insertId });
  });
});



app.post('/students/email-exist', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const sql = 'SELECT COUNT(*) AS count FROM students WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ exists: false });
    }

    const exists = results[0].count > 0;
    res.json({ exists });
  });
});



// Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
