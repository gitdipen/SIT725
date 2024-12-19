// server.js
const express = require('express'); 
const path = require('path'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
const app = express(); 
const PORT = 3000; 

// Middleware to parse JSON requests 
app.use(express.json()); 

// Serve static files from the 'public' directory 
app.use(express.static(path.join(__dirname, 'public'))); 

// Use routes 
app.use('/', reviewRoutes); 

// Default route to serve home.html 
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'home.html')); 
}); 

// Export app for testing purposes
module.exports = app; 

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => { 
        console.log(`Server is running on http://localhost:${PORT}`); 
    });
}
