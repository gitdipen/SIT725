const express = require('express'); //import express
const bodyParser = require('body-parser'); //import bodyparser
const path = require('path'); //import path 

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

//static css
app.use(express.static(path.join(__dirname)));

//for html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

//to reflect addition calculation
app.post('/', (req, res) => { 
    const n1 = parseFloat(req.body.number1); 
    const n2 = parseFloat(req.body.number2); 
    const add = n1 + n2; 
    res.send('The value is ' + add); 
});

//initiate server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});