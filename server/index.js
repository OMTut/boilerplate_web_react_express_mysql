const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql2');

//conn
const conn = mysql.createPool({
    host: 'localhost',
    user: 'tuttle',
    password: 'Tutbwb@16',
    database: 'crudboiler_db',
})

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSELECT = "SELECT * FROM movie_reviews;"
    conn.query(sqlSELECT, (err, result) => {
        res.send(result)
    })
})

//insert function
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
    conn.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    })
})

//update
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    conn.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err)
    })
})

//delete
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    conn.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
})