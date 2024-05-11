const mongoose = require('mongoose');


// Define the schema
const dailyincomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  dailyIncome: [
  ],
});

// Create the model
const Dailyincome = mongoose.model('Dailyincome', dailyincomeSchema);

module.exports = Dailyincome;
