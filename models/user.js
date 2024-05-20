const mongoose = require('mongoose');
const generateRandomNumber = (length) => {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

// Define the schema for the user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/\d{10}/, 'Please fill a valid mobile number']
  },
  password: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    trim: true,
    required: true,

  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  packageId: {
    type: String,
    required: true,
  },
  couponCode: {
    type: String,
    trim: true
  },
  transactionId: {
    type: String,
    trim: true
  },
  yourReferralCode: {
    type: String,
    default: () => generateRandomNumber(6), // Generates a 6-digit random number
    unique: true // Ensure the referral code is unique
  },
  status: {
    type: String,
    default:'Pending'// Generates a 6-digit random number
    // Ensure the referral code is unique
  },
  role: {
    type: String,
    default:'user'// Generates a 6-digit random number
    // Ensure the referral code is unique
  },
  profile:{
    type:String,
    default:""
  },
  createdDate: { // New field for recording the date of creation
    type: Date,
    default: Date.now // Sets the default value to the current date and time
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
