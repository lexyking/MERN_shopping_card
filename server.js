const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const items = require('./routes/api/items');

const app = express();
dotenv.config();


//BodyParser and morgan Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

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
app.use('/api/items', items)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on mode ${process.env.PORT} or at local ${port}`)
)