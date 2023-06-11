'use strict'

import express from 'express';
import bodyParser from 'body-parser'
// import cors from 'cors'
const app = express();
const port = 8080;

//Middleware
app.use(bodyParser.urlencoded({extended: false}))

//Project data object
let projectData = {}

//Load page render
app.use(express.static('website'))

//GET route
app.get('/all', (req, res) => {
    res.send(projectData)
})

//POST route
app.post('/postData', (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(projectData)
    res.send({message: 'Data added successfully!'})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


