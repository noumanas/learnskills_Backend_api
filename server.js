const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
require('dotenv').config(); 
const app = express();
const port = 9000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
// CORS configuration for development
var whitelist = ['https://learnskills-jz7e8.ondigitalocean.app', 'https://learnskills-jz7e8.ondigitalocean.app/pages']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
  app.use(cors());

app.use(bodyParser.json());

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {});
      console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
      console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  }
};

// Hypothetical middleware for authentication
const authenticateToken = (req, res, next) => {
    // Extract token from request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token provided, return 401 Unauthorized
    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }

    // Verify token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }
        // Store decoded token data in request object for use in subsequent middleware/routes
        req.userId = decoded.userId;
        next();
    });
};
app.post('/register', cors(corsOptions) ,userController.registerUser);
app.post('/login', cors(corsOptions),userController.loginUser);
app.get('/user-info',cors(corsOptions), authenticateToken, userController.UserInfo);
app.post('/referral-info',cors(corsOptions), authenticateToken, userController.referralInfo);
app.post('/earnings',cors(corsOptions),userController.earnings);
app.get('/earnings/:id',cors(corsOptions),userController.earningGetById);



connectDB();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
