'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 8080;

// Project data object
let projectData = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


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