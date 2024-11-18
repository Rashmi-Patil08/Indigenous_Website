const express = require('express');
const { getAllUsers, getUserById } = require('../services/userService');

const router = express.Router();

// Route 1: Fetch all users
router.get('/users', (req, res) => {
  try {
    const users = getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
});

// Route 2: Fetch a specific user by ID
router.get('/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
});

module.exports = router;
