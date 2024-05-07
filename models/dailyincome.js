const mongoose = require('mongoose');


// Define the schema
const dailyincomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  dailyIncome: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    }
  ],
});

// Create the model
const Dailyincome = mongoose.model('Dailyincome', dailyincomeSchema);

module.exports = Dailyincome;
