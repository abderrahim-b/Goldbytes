const User = require("../Models/User");
const bcrypt = require('bcryptjs');

const createAdmin = async (req, res) => {
  try {
    const username = process.env.Admin_USERNAME;
    const password = process.env.Admin_PASSWORD;

    const existingAdmin = await User.findOne({ username, role: "admin" });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new User({ username, password: hashedPassword, role: "admin" });
    await newAdmin.save();

    console.log('Admin created successfully');
    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};

module.exports = { createAdmin };