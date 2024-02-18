
const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const Person = require('./models/Person');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // I have used json data in body // req.body
const passport = require('./auth');
const PORT = process.env.PORT;


app.use(passport.initialize());

const localAuthMiddleware =  passport.authenticate('local', { session: false })
  
// app.get('/', localAuthMiddleware, function (req, res) {
//     // Upon successful authentication, respond with a welcome message
//     res.send('Hi! Welcome to the hotel.');
// });


// import router file
const personRoutes = require('./routes/personRoutes');
// app.use('/person', personRoutes);
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuItem', localAuthMiddleware , menuItemRoutes);



app.listen(PORT, ()=>{
    console.log('server working');
}) 


