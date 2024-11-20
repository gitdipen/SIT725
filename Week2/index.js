const express = require('express');
const bodyParser = require('body-parser'); // Corrected capitalization
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Corrected usage

// Serve the HTML file on GET request
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle POST request to add numbers
app.post('/', (req, res) => { // Corrected route definition
    const n1 = parseFloat(req.body.number1); // Convert to number
    const n2 = parseFloat(req.body.number2); // Convert to number
    const add = n1 + n2; // Perform addition
    res.send('The value is ' + add); // Added space for readability
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at port 3000");
});