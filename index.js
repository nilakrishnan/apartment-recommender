require('dotenv').config()
const express = require('express')
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 80;

const con = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('hi')
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
