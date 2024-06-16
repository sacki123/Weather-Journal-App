// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listenning);
function listenning(){
    console.log(`server running on port ${port}`);
};

//Router
app.get("/all",getResponse);

app.post("/add",postResponse);

function getResponse(req, res){
    res.send(projectData);
    console.log(projectData);
};

function postResponse(req, res){
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);
};
