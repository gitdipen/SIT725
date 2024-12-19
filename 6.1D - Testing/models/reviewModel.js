const fs = require('fs');
const path = require('path');
const reviewsFilePath = path.join(__dirname, '../data/reviews.json');

const getReviews = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(reviewsFilePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data ? JSON.parse(data) : []);
        });
    });
};

const saveReview = (review) => {
    return getReviews()
        .then((reviews) => {
            reviews.push(review);
            return new Promise((resolve, reject) => {
                fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        });
};

module.exports = { getReviews, saveReview };
