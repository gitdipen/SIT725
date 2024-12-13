const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

//For submitting the review
router.post('/submit-review', reviewController.submitReview);
module.exports = router;
