const mongoose = require('mongoose');

const userEarningsSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    email: {
      type: String,
      required: true
    },
    todayEarnings: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    createdDate: { 
      type: Date,
      default: Date.now
    }
  });
  
  // Create a model from the schema
  const Earnings = mongoose.model('Earnings', userEarningsSchema);
  
  module.exports = Earnings;