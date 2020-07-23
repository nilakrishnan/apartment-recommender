require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');


const app = express()

const PORT = process.env.PORT || 80;

const db = mysql.createPool({
  host: process.env.HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.DATABASE
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/user', (req, res) => {
  if (!req.query.userId || !req.query.reviewId) {
    throw new Error('oops')
  }
  db.query(`SELECT * FROM User NATURAL JOIN Review WHERE UserId = ${req.query.userId}`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.send(results)
  })
})

app.post('/addUser', (req, res) => {
  console.log(req.body);
  new_user_uuid = uuidv4();
  console.log(new_uuid);

  db.query(`INSERT INTO User(UserId, FirstName, LastName) VALUES ("${new_user_uuid}", "${req.body.FirstName}", "${req.body.LastName}")`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})

app.post('/addReview', (req, res) => {
  console.log(req.body);
  new_uuid_review = uuidv4();
  console.log("new_uuid_review");
  console.log(new_uuid_review);

  const now = new Date();

  // yyyy-mm-dd
  format_date = date.format(now, 'YYYY-MM-DD');
  console.log("format_date");
  console.log(format_date);

  db.query(`INSERT INTO Review(ReviewId, Date, Rating, Description, UserId)
            VALUES ("${new_uuid_review}", "${format_date}", "${req.body.Rating}",
            "${req.body.Description}", "${req.body.UserId}")`,
            function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new review!')
  })
})

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
