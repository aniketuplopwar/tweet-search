import express from 'express';

const router = express.Router();
router.use(express.static('../../../../'));
router.use(express.static('dist'));

// define the home page route
router.get('/', function (req, res) {
  res.sendFile('index.html');
});

module.exports = router;