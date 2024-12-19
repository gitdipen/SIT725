const request = require('supertest');
const app = require('../server'); // Importing the instance for the server

describe('Testing', () => {
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
    });

    // data retrieval testing
    describe('GET /reviews', () => {
        it('should return all reviews', async () => {
            const response = await request(app).get('/reviews');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});
