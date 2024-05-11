const userService = require('../services/userService');

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function earnings(req, res) {
    try {
      const userData = req.body;
      const user = await userService.earnings(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
async function loginUser(req, res) {
    try {
      const userData = req.body;
      const user = await userService.loginUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function updateUserInfo(req, res) {
    try {
      const userData = req.userId;
      const file = req.file
      const user = await userService.updateUserInfo(userData,file);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function UserInfo(req, res) {
    try {
      const userData = req.userId;
      const user = await userService.UserInfo(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function referralInfo(req, res) {
    try {
      const userData =req.body?.referralCode;
      const user = await userService.referralInfo(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async function earningGetById(req, res){
    try {
        const userId = req.params.id; 
      const data = await userService.earningGetById(userId);
      res.status(201).json(data);
    } catch (error) {
        
    }
  }
  async function getDailyincome(req, res){
    try {
        const userId = req.params.id; 
      const data = await userService.getDailyincome(userId);
      res.status(201).json(data);
    } catch (error) {
        
    }
  }
module.exports = {
  registerUser,
  loginUser,
  UserInfo,
  referralInfo,
  earnings,
  earningGetById,
  getDailyincome,
  updateUserInfo,
};
