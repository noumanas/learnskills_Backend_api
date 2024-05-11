const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Earnings = require('../models/earning')
const Dailyincome = require('../models/dailyincome')
const fs = require('fs');
const path = require('path');
class UserServices {
    constructor() {}

    async createUser(userData) {
        try {
             // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Save user with hashed password
        const newUser = new User({
            firstName: userData.firstName,         // Required
            lastName: userData.lastName,           // Required
            email: userData.email,                 // Required
            mobileNumber: userData.mobileNumber,   // Required
            password: hashedPassword,              // Already being set
            referralCode: userData.referralCode,   // Optional, unless your logic requires it
            state: userData.state,                 // Required
            packageId: userData.packageId,             // Required
            couponCode: userData.couponCode,       // Optional
            transactionId: userData.transactionId, // Optional
            yourReferralCode: userData.yourReferralCode // This will be auto-generated if not provided
            // Add any additional fields that are needed and defined in your schema
        });
        const savedUser = await newUser.save();


        return { user: savedUser };
        } catch (error) {
            throw error;
        }
    }

    async earnings(data) {
        try {
            // Create a new earnings document
            const newEarnings = new Earnings({
                user: data.userId, // Assuming user ID is provided in userData
                email: data.email, // Assuming email is provided in userData
                todayEarnings: data.todayEarnings, // Assuming today's earnings are provided in userData
                balance: data.balance // Assuming today's earnings are provided in userData

            });

            // Save earnings document
            const savedEarnings = await newEarnings.save();

            return { earnings: savedEarnings };
        } catch (error) {
            throw error;
        }
    }
    async earningGetById(userId) {
        try {
            // Create a new earnings document
            const earnings = await Earnings.findOne({user:userId})
            if(!earnings){
                throw new Error('Earnings not found');
            }
            return { earnings };
        } catch (error) {
            throw error;
        }
    }
    async loginUser(credentials) {
        try {
            // Find user by email
            const user = await User.findOne({ email: credentials.email });
            if (!user) {
                throw new Error('User not found');
            }

            // Verify password
            const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordMatch) {
                throw new Error('Invalid password');
            }

            // Generate token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
            if(user.status === "Pending"){
                throw new Error('Your Account is not Activate');
            }
            return { user, token };
        } catch (error) {
            throw error;
        }
    }
    async UserInfo(id) {
        try {
            // Find user by email
            const user = await User.findOne({ _id:id  });
            if (!user) {
                throw new Error('User not found');
            }
            const imagePath = path.join(__dirname, 'public', 'uploads', user.profile);
            return { user,imagePath };
        } catch (error) {
            throw error;
        }
    }
    async updateUserInfo(id,image) {
        try {
            // Find user by email
            const user = await User.findOne({ _id:id  });
            if (!user) {
                throw new Error('User not found');
            }
            // Save the image to the public folder
            const uploadDir = path.join(__dirname, 'public', 'uploads'); // Path to public folder; // Path to save the image // Save the image
    
            // Update the user's profile with the image filename (or URL if you're using relative paths)
            user.profile = `/uploads/${image.filename}`; // Assuming 'images' is the folder where images are stored
            await user.save();

            return { user };
        } catch (error) {
            throw error;
        }
    }
    async referralInfo(referralcode) {
        try {
            // Find user by email
            const data = parseInt(referralcode)
            const user = await User.find({ referralCode: data });
            if (!user) {
                throw new Error('referralCode not found');
            }
            if(user.role =='admin'){
                const user = await User.find();
                return { user };

            }
            else{
                return { user };

            }

        } catch (error) {
            throw error;
        }
    }
    async getDailyincome(userId) {
        try {
            // Find user by email
            const dailyincomeData = await Dailyincome.findOne({ user:userId });
            if (!dailyincomeData) {
                throw new Error('income is not find');
            }
            return {dailyincomeData}
           
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserServices();
