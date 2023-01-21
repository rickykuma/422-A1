/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Mohammad Rashidi Khorasnd Student ID: 1347713213 Date: Jan 19, 2022
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 


const express = require('express');
const app = express();
const MoviesDB = require("./modules/moviesDB");
const db = new MoviesDB();
const cors = require('cors')
const bodyParser = require("body-parser")
const dotenv = require('dotenv').config();
var HTTP_PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
      console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});



app.get('/', (req, res) => {
  res.json({message : "API Listening"})
})


app.post("/api/movies", (req, res) => {
  db.addNewMovie(req.body)
    .then(() => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(500).json({ error : err })
    })
})

app.get("/api/movies", (req, res) => {
  db.getAllMovies(req.query.page,req.query.perPage, req.query.title)
  .then((data) => 
  {
    if(data.length == 0)
    {
      res.status(204).json({message : 'No Data found'})
    }
    else
    {
      res.json(data)
    }
  })
  .catch((err) =>
  {
    res.status(500).json({ error : err})
  })
})

app.get("/api/movies/:_id", (req, res) =>
{
  db.getMovieById(req.params._id)
  .then((data) =>
  {
    res.json(data)
  })
  .catch((err) => 
  {
    res.status(500).json({ error : err})
  })
})


app.put("/api/movies/:_id", (req, res) => 
{
  db.updateMovieById(req.params._id)
  .then((data) => 
  {
    res.json( {message : "Movie Successfully updated"})
  })
  .catch((err) => 
  {
    res.status(500).json({ error : err})
  })
})


app.delete("/api/movies/:_id", (req, res) =>
{
  db.deleteMovieById(req.params._id)
  .then((data) =>
  {
    res.json({message : "Movie Successfully deleted"})
  })
  .catch((err) => 
  {
    res.status(500).json({ error : err})
  })
})  


