const express = require('express');
const friends = require('./friends.mock.json');

const router = express.Router();

router.get('/api/get-friends', (req, res) => {
  res.json(friends);
});

module.exports = router;
