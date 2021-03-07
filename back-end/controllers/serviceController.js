const ServiceModel = require('../models/service');
var express = require('express');

const getServices = (req, res) => {
  ServiceModel.find((e,r) => {
    if(e){
        console.log(e)
    }
    else{
        res.send(r);
    }
})
}

const addService =(req, res, next)=> {
  const newData = new ServiceModel (req.body)
  newData.save(function(err){
      if (err) {
      res.send("data not saved");
      return handleError(err);
  }
});
res.send("data saved");
}

module.exports = {getServices,addService};