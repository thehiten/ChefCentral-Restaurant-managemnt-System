
const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // I have used json data in body // req.body

const PORT = process.env.PORT;

app.get('/', function (req, res) { // object   // Hi welocome // to hotelis end point = menu
  res.send('Hi welocome to hotel ')
})


// import router file
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuItem', menuItemRoutes);



app.listen(PORT, ()=>{
    console.log('server working');
}) 

