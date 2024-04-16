const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
require('dotenv').config(); 
const app = express();
const port = 9000;
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
