const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
dotenv.config();

app.listen(8800, () => {
  console.log("backend is running on http://localhost/8800");
});
