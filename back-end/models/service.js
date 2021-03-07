const mongoose = require('mongoose');
var express = require('express');

const base = new mongoose.Schema({
  serviceName: {
        type: String,
        required: true
    },
  });
  const ServiceModel = mongoose.model('services', base);
  

  module.exports=ServiceModel