const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

const app = express();
const port = 8000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
// CORS configuration for development
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only the frontend origin
    optionsSuccessStatus: 200 // For legacy browser support
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://noumanas:Hami1234@cluster0.qr9wprj.mongodb.net/LearnSkill?&authSource=admin')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
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
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/user-info', authenticateToken, userController.UserInfo);
app.post('/referral-info', authenticateToken, userController.referralInfo);
app.post('/earnings',userController.earnings);
app.get('/earnings/:id',userController.earningGetById);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});