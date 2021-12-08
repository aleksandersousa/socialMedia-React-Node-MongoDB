const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
  {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => {
    console.log('connected to MONGODB');  
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.listen(8800, () => {
  console.log('backend is running on http://localhost/8800');
});
