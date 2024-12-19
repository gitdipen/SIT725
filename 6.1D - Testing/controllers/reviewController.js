const reviewModel = require('../models/reviewModel');

const submitReview = (req, res) => {
    const { name, review } = req.body;
    if (!name || !review) {
        return res.status(400).json({ message: 'Name and review are required.' });
    }
    reviewModel
        .saveReview({ name, review })
        .then(() => res.json({ message: 'Review submitted successfully!' }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to save review.' });
        });
};

const getAllReviews = (req, res) => {
    reviewModel
        .getReviews()
        .then((reviews) => res.json(reviews))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to fetch reviews.' });
        });
};

module.exports = { submitReview, getAllReviews };
