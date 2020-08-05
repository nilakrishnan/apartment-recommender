require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path');
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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/getUser', (req, res) => {
  db.query(`SELECT * FROM User WHERE UserId = '${req.query.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.status(200).json(results)
  })
})

app.post('/addUser', (req, res) => {
  db.query(`INSERT INTO User (UserId, FirstName, LastName)
  SELECT "${req.body.UserId}","${req.body.FirstName}","${req.body.LastName}"
  FROM User
  WHERE NOT EXISTS (SELECT "${req.body.UserId}" FROM User WHERE UserId = "${req.body.UserId}")
  LIMIT 1;`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})

app.post('/updateUser', (req, res) => {
  let selectFromString = `UPDATE User`
  let setString = ''

  Object.entries(req.body).forEach(([key,value]) => {
    if (key != 'UserId') {
      setString += ` , ${key}='${value}'`
    }
  })

  if (setString.length != 0) {
    setString = `SET ${setString.slice(3)}`
  }

  db.query(`${selectFromString} ${setString} WHERE UserId='${req.body.UserId}'` , function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Updated user!')
  })
})

app.post('/deleteUser', (req, res) => {
  db.query(`DELETE From Review WHERE UserId = '${req.body.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error
    }
    db.query(`DELETE From User WHERE UserId = '${req.body.UserId}'`, function (error, results, fields) {
      if (error) {
        throw error
      }
      res.send('Deleted user!')
    })
  })
})

app.get('/getReviews', (req, res) => {
  db.query(`select * from Review natural join User natural join Apartment natural join AptBuilding where UserId = '${req.query.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.json(results)
  })
})

app.post('/addReview', (req, res) => {
  new_uuid_review = uuidv4();
  const now = new Date();
  format_date = date.format(now, 'YYYY-MM-DD');

  db.query(`INSERT INTO Review(ReviewId, UserId, AptId, Date, ResponsivenessRating,
            SecurityDepositReturnedRating, WeekdayVolumeRating, WeekendVolumeRating,
            GreenStProximityRating, TransportationProximity, OverallRating, Description)
            VALUES ('${new_uuid_review}', '${req.body.UserId}', '${req.body.AptId}', '${format_date}',
            '${req.body.ResponsivenessRating}', '${req.body.SecurityDepositReturnedRating}',
            '${req.body.WeekdayVolumeRating}', '${req.body.WeekendVolumeRating}',
            '${req.body.GreenStProximityRating}', '${req.body.TransportationProximity}',
            '${req.body.OverallRating}', '${req.body.Description}')`,
            function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added review!')
  })
})

app.post('/updateReview', (req, res) => {
  let selectFromString = `UPDATE Review`
  let setString = ''

  Object.entries(req.body).forEach(([key,value]) => {
    if (key != 'ReviewId') {
      setString += ` , ${key}='${value}'`
    }
  })

  if (setString.length != 0) {
    setString = `SET ${setString.slice(3)}`
  }

  db.query(`${selectFromString} ${setString} WHERE ReviewId='${req.body.ReviewId}'` , function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Updated review!')
  })
})

app.post('/deleteReview', (req, res) => {
  db.query(`DELETE From Review WHERE ReviewId = '${req.body.ReviewId}'`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted review!')
  })
})


app.get('/getRecommendations', (req, res) => {
  db.query(`SELECT * FROM Recommendation NATURAL JOIN Apartment NATURAL JOIN AptBuilding WHERE UserId = '${req.query.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.status(200).json(results)
  })
})

app.post('/search', (req, res) => {
  let selectFromString = `SELECT DISTINCT BuildingId, Address, Company, Price, NumBeds, NumBaths FROM AptBuilding NATURAL JOIN Apartment NATURAL JOIN Amenities NATURAL JOIN Review`
  let whereString = ''

  Object.entries(req.body).forEach(([key,value]) => {
    if (key === 'Price') {
      whereString += ` AND ${key}<=${value}`

    } else if (value === 0 || value === 1 || key === 'NumBeds' || key === 'NumBaths') {
      whereString += ` AND ${key}=${value}`

    } else {
      whereString += ` AND ${key}>=${value}`
    }
  })

  if (whereString.length != 0) {
    whereString = ` WHERE ${whereString.slice(5)} GROUP BY Company ORDER BY Price ASC`
  }

  db.query(selectFromString + whereString, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.json(results)
  })
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
