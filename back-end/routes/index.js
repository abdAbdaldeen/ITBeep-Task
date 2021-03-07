var express = require('express');
var router = express.Router();


router.post("/sendEmail",function(req, res){
  const send = require('gmail-send')({
    user: process.env.Email,
    pass: process.env.Password,
    to:   req.body.email,
    subject: 'شكرا لهتمامك في خدماتنا',
  });
  let offers =""
  req.body.selectedOffers.map(offer=>{
    offers += offer+"، "
  })
  send({
    html: `
    <p dir="auto" style="font-size: 1rem;">
  <b>الاسم:</b> ${req.body.name} <br/>
  <b>الجوال:</b> ${req.body.number} <br/>
  <b>العروض المختارة:</b> ${offers} <br/>
  <b>متى ترغب برفع الطلب:</b> ${req.body.interest} <br/>
</p>`,
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    else{
      res.json(result)
    }
  })
})
module.exports = router;
