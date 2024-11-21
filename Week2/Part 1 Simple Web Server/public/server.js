const express = require('express'); //import express
const path = require('path'); //import path

const app = express();
const port = 3000;

// Using Get method
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});