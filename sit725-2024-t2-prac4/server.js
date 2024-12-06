// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files (like index.html)

// Endpoint to handle review submission
app.post('/submit-review', (req, res) => {
    const { name, review } = req.body;

    // Load existing reviews from JSON file or create an empty array if it doesn't exist
    const filePath = path.join(__dirname, 'reviews.json');
    let reviews = [];
    
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        reviews = JSON.parse(data);
    }

    // Add new review to the array
    reviews.push({ name, review });

    // Write updated reviews back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

    res.json({ message: 'Review submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});