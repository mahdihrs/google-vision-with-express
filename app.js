require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

//Google Vision
const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.KEYFILE_PATH
});

//Express Generator 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Google Vision 
client
  .labelDetection('./assets/golden-retriever.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;
    console.log(labels)
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

module.exports = app;
