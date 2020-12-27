const index = require("../index");
const express = require("express");
const multer = require('multer');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const users = require("../models/model");
const router = express.Router();

//mail for trade to manager and save its data
router.post("/Trade", async(req, res) =>
{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var mobileno = req.body.mobileno;
    var email = req.body.email; 
    var currentprofile = req.body.currentprofile;
    var companyname = req.body.companyname;
    var reference = req.body.reference;
    var dermafieldexperience = req.body.dermafieldexperience;
    var segment = req.body.segment;
    var comment = req.body.comment;
  const data = new users.trade({
    _id:new index.mongoose.Types.ObjectId(),
    firstname: firstname,
    lastname: lastname,
    address: address,
    city: city,
    state: state,
    country: country,
    mobileno: mobileno,
    email: email,
    currentprofile: currentprofile,
    companyname: companyname,
    reference: reference,
    dermafieldexperience: dermafieldexperience,
    segment: segment,
    comment: comment
  });
  var textBody ="This Message is from Trade Inquiry From Aaizole Derma\nfrom,\nName: "+firstname+" "+lastname+"\nAddress: "+address+"\nCity: "+city+"\nState: "+state+"\nCountry: "+country+"\nMobileNo.: "+mobileno+"\nEmail: "+email+"\nCurrent Profile: "+currentprofile+"\nCompany Name: "+companyname+"\nReference: "+reference+"\nDerma Field Experience: "+dermafieldexperience+"\nExposure Of Derma Segment: "+segment+"\nComments: "+comment;

   /*const result = */await data.save();/*.then((result)=>*/
  //{   
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user: "aaizolederma123@gmail.com",
          pass: "aaizole123",
        },
      });
      var mailOptions = 
      {
        from: "aaizolederma123@gmail.com",
        to: ["aaizolederma123@gmail.com","aaizolederma819@gmail.com"],
        subject: "Contact Us From Aaizole Derma",
        text: textBody,
      };
      transport.sendMail(mailOptions, function(err, informaton)
      {      
        if (err) 
        {
          var error = 
          {
            is_error: true,
            message: err.message,
          };
          console.log("Message not sent");
          console.log(error);
          return res.status(500).send(error);
        }
        else
        {
          var error =
          {
            is_error: false,
            message:"Message sent", 
          };
          console.log("Message sent");
          return res.status(200).send(error);            
        }
      })    
});

module.exports = router;