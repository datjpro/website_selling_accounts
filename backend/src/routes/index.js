const express = require('express');
const router = express.Router();

// Placeholder routes - add your routes here
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Website Selling Accounts API' });
});

module.exports = router;
