const InterestModel = require('../models/interest');

const getInterests = (req, res) => {
  InterestModel.find((e,r) => {
    if(e){
        console.log(e)
    }
    else{
        res.send(r);
    }
})
}

const addInterests = (req, res)=>{
  const newData = new InterestModel (req.body)
  newData.save(function(err){
      if (err) {
      res.send("data not saved");
      return handleError(err);
  }
});
res.send("data saved");
}
module.exports = {getInterests,addInterests};
