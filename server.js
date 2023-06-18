'use strict'

import express from 'express';
// import bodyParser from 'body-parser'
// import cors from 'cors'
const app = express();
const port = 8080;

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Project data object
let projectData = {};

// Load page render
app.use(express.static('website'));

// GET route
app.get('/all', (req, res) => {
  res.status(200).send(projectData);
});

// POST route
app.post('/postData', (req, res) => {
  
  // Store the data in projectData object
  projectData = req.body;
  res.status(200).send(projectData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});