const request = require('supertest');
const app = require('../server'); // Importing the instance for the server
const fs = require('fs');
const path = require('path');
const reviewsFilePath = path.join(__dirname, '../data/reviews.json');

// Helper function to reset reviews file
const resetReviewsFile = () => {
    const initialReviews = [
        { "name": "review1", "review": "Testing the review." },
        { "name": "Alex", "review": "Checked the basics and it's working fine. you can try expanding with various tests." }
    ];
    fs.writeFileSync(reviewsFilePath, JSON.stringify(initialReviews, null, 2));
};

describe('Testing Review Routes', () => {
    beforeEach(() => {
        resetReviewsFile();
    });

    // Test Case for the submitting a review
    describe('POST /submit-review', () => {
        it('should return success message for valid input', async () => {
            const response = await request(app)
                .post('/submit-review')
                .send({ name: 'Test User', review: 'This is a test review.' })
                .set('Accept', 'application/json');
            
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Review submitted successfully!');
        });

        it('should return error for missing name or review', async () => {
            const response = await request(app)
                .post('/submit-review')
                .send({ name: '', review: '' })
                .set('Accept', 'application/json');
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name and review are required.');
        });

        it('should handle XSS in reviews', async () => {
            const response = await request(app)
                .post('/submit-review')
                .send({ name: 'xss', review: '<script>alert(1)</script>' })
                .set('Accept', 'application/json');
            
            expect(response.status).toBe(200); // Assuming no error handling for XSS yet
            expect(response.body.message).toBe('Review submitted successfully!');
        });
    });

    // Test Case for retrieving all reviews
    describe('GET /reviews', () => {
        it('should return all reviews', async () => {
            const response = await request(app).get('/reviews');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return empty array if no reviews', async () => {
            // Empty the reviews file for this test
            fs.writeFileSync(reviewsFilePath, JSON.stringify([], null, 2));

            const response = await request(app).get('/reviews');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});