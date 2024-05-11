const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const bodyParser = require('body-parser');
const authenticateToken = require('./authMiddleware'); 
const Dailyincome = require("./models/dailyincome");
const User = require("./models/user");
const cron = require('node-cron');
require("dotenv").config();
// CORS configuration for development
var whitelist = ['https://learnskills-jz7e8.ondigitalocean.app', 'https://learnskills-jz7e8.ondigitalocean.app/pages', "http://localhost:3000",'https://learnskills.pro']
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
app.use(express.json());
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {});
      console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
      console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  }
};
app.post('/register', cors(corsOptions) ,userController.registerUser);
app.post('/login', cors(corsOptions),userController.loginUser);
app.get('/user-info',cors(corsOptions),authenticateToken, userController.UserInfo);
app.post('/referral-info',cors(corsOptions),authenticateToken, userController.referralInfo);
app.post('/earnings',cors(corsOptions),userController.earnings);
app.get('/earnings/:id',cors(corsOptions),userController.earningGetById);
app.get('/dailyincome/:id',cors(corsOptions),userController.getDailyincome);


app.get("/", (req, res) => {
    res.send("server is live")
});
cron.schedule('0 1 * * *', async () => {
  try {


    const users = await User.find({}, '_id');

    // Iterate over the users
    for (const user of users) {
      // Check if the user already has an entry for today in the Earning collection
      const existingEarning = await Dailyincome.findOne({
        user: user._id
      });

      // If an entry exists, update the dailyIncome field
      if (existingEarning) {
        const updateData ={ 
          amount: 0,
          date: new Date(),
        }
        existingEarning.dailyIncome.push(updateData);
        await existingEarning.save();
      } else {
        // If no entry exists for today, create a new one
        const updateData ={ 
          amount: 0,
          date: new Date(),
        }
        const newEarning = new Dailyincome({
          user: user._id,
          dailyIncome:updateData// Current date
        });
        await newEarning.save();
      }
    }

    console.log('Daily income updated for all users.');
  } catch (error) {
    console.error('Error updating daily income:', error);
  }
});
// app.get('/stats/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const config = {
//             headers: {
//                 apiKey: process.env.APIKEY
//             }
//         }
//         const response = await axios.get(`https://api.songstats.com/enterprise/v1/artists/stats?&source=spotify,applemusic,deezer,tiktok,youtube&spotify_artist_id=${id}`, config);
//         res.json(response.data);
//     }
//     catch(error) {
//         res.send(error)
//     }
// });

// app.get("/spotify/:id", async (req, res) => {
//     const id = req.params.id;
//     const config = {
//         headers: {
//             apiKey: process.env.APIKEY
//         }
//     }
//     const response = await axios.get(`https://api.songstats.com/enterprise/v1/artists/catalog?&source=spotify,applemusic,deezer,tiktok,youtube,soundcloud&spotify_artist_id=${id}`, config);
//     res.json(response.data);
// });

// app.get("/spotify/tracks/:track_id/:id", async (req, res) => {
//     try{
//         const id = req.params.id;
//         const songstats = req.params.track_id
//         const config = {
//             headers: {
//                 apiKey: process.env.APIKEY
//             }
//         }
//         const response = await axios.get(`https://api.songstats.com/enterprise/v1/tracks/stats?songstats_track_id=${songstats}?&source=spotify,applemusic,deezer,tiktok,youtube,soundcloud&spotify_artist_id=${id}`, config);
//          res.json(response.data);
//     }
//     catch(error) {
//         res.send(error)
//     }    
    
// });
connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Songstats Service: Listening: ${PORT}`));