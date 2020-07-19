const express = require('express')
const pgp = require('pg-promise')()

const app = express();

const PORT = process.env.PORT || 80;

var db = pgp('postgres://root:project123!@localhost:5542/database')

app.get('/', (req, res) => {
  db.one('SELECT *', 1)
  .then((data) => {
    res.send(data.value)
  })
  .catch(function (error) {
    res.send(error)
  })
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
