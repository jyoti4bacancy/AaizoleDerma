const index = require("../index");
const express = require("express");
const multer = require('multer');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const users = require("../models/model");
const router = express.Router();

//mail for contact us to manager and save its data
router.post("/contactUs", async(req, res) =>
{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var mobileno = req.body.mobileno;
    var email = req.body.email;
    var requirements = req.body.requirements;  
  const data = new users.contactus({
    _id:new index.mongoose.Types.ObjectId(),
    firstname: firstname,
    lastname: lastname,
    mobileno: mobileno,
    email: email,
    requirements: requirements 
  });
  var textBody ="This Message is from ContactUs From Aaizole Derma\nfrom,\nName: "+firstname+" "+lastname+"\nMobileNo.: "+mobileno+"\nEmail: "+email+"\nRequirements: "+requirements;
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
        //console.log("in send mail");    
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
    //})   
});

module.exports = router;