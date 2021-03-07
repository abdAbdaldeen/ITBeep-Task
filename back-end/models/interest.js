const mongoose = require('mongoose');
var express = require('express');

const base = new mongoose.Schema({
  interest: {
        type: String,
        required: true
    },
  });
  const InterestModel = mongoose.model('interests', base);
  

  module.exports=InterestModel