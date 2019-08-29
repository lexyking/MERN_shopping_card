const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
dotenv.config();


//BodyParser and morgan Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Connecting to MongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },

  () => {
    console.log("connected to db!");
  })

//Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

//Server static assets id in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on mode ${process.env.PORT} or at local ${port}`)
)