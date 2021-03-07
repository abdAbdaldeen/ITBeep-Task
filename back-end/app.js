var express = require('express');
var indexRouter = require('./routes/index');
var servicesRouter = require('./routes/services');
var interestsRouter = require('./routes/interests');
// =========================
// =========================
var cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// =========================
// =========================
var app = express();
dotenv.config();
app.use(cors());
// =========================
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ===============
mongoose
  .connect(process.env.Url, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((e) => {
    console.log('Connection failed! -> '+ e);
  });
// ===============
app.use('/api', indexRouter);
app.use('/api/services', servicesRouter);
app.use('/api/interests', interestsRouter);
// ===============
module.exports = app;
