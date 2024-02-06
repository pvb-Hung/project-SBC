// server.js
const express = require('express');
const API_v1 = require('./routes/v1');
var bodyParser = require('body-parser')
const db = require('./configs/mongodb');
const multer = require("multer");
require('dotenv').config()

const errorHandle = require('./middleware/errorHandler');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const upload = multer();
app.use(upload.any());

app.use('/v1', API_v1);
app.use(errorHandle);

// Connect to DB
db.connect();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});