const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL =   process.env.MONGODB_URL
mongoose.connect('mongodb:', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });




// moongose has default object
//
const db = mongoose.connection;
//
// event listner has ability to listen connection to database (ye phale se hote h) 
//
// Event handler for successful MongoDB connection
// connected error disconnected are keywords that db can understand and gives output
db.on('connected', ()=>{
    console.log('connected to mongo db server');
}) 

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

db.on('disconnected', ()=>{
    console.log('disconnected to mongo db');
})

module.exports = db;

// 
