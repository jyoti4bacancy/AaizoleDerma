const index = require("../index");
const express = require("express");
const users = require("../models/model");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const { response } = require("express");
//const sendmail = require('sendmail')

const DIR = "./images/mr/";

function randomString()
{
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@_";
  var strlen = 8;
  var randomstring = "";
  for(var i = 0; i < strlen; i++)
  {
    var random_number = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(random_number, random_number + 1);
  }
  return randomstring;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//update mr profile without image
router.post("/up", async (req, res) => {
  users.mr
    .updateOne(
      { username: req.body.username },
      {
        $set: {
          firstname: req.body.firstname,
          middlename: req.body.middlename,
          lastname: req.body.lastname,
          mobileno: req.body.mobileno,
          email: req.body.email,
          dob: req.body.dob,
          city: req.body.city,
          previouscompany: req.body.previouscompany,
          experience: req.body.experience,
          fathersmobileno: req.body.fathersmobileno,
          gender: req.body.gender,
          address: req.body.address,
          country: req.body.country,
          state: req.body.state,
          religions: req.body.religions,
          knownLanguage: req.body.knownLanguage,
          tenthPassYear: req.body.tenthPassYear,
          twelvethPassYear: req.body.twelvethPassYear,
          graduationCompleteYear: req.body.graduationCompleteYear,
          maritalstatus: req.body.maritalstatus,
          is_first: false,
        },
      }
    )
    .then((result) => {
      res.json({
        is_error: false,
        message: "profile add successfull!",
      });

      console.log("profile add successfull..!!");
    })
    .catch((err) => {
      var error = {
        is_error: true,
        message: err,
      };
      console.log(error);
      return res.status(500).send(error);
    });
});

//update mr details with image
router.post("/updatemrprofile", upload.single('profileimg'), async(req, res) =>
{ 
  const url = req.protocol + "://" + req.get("host");
  var img;  
  if(!req.file)
  {
	  users.mr.findOne({username:req.body.username})
	  .then((result)=>
    {
      console.log(result);
      img=result.profileimg;
    
    })
    .catch((err)=>
    {
	    console.log(err);
    })
  }
  else
  {
    img= url + "/images/mr/" + req.file.filename,
    console.log(img);
  }
  //console.log("vdvsdf"+img);
    users.mr.updateOne({username: req.body.username},
    {
      
      $set:
      {
        profileimg:img,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        mobileno: req.body.mobileno,
        email: req.body.email,
        dob: req.body.dob,
        city: req.body.city,
        previouscompany: req.body.previouscompany,
        experience: req.body.experience,
        fathersmobileno: req.body.fathersmobileno,
	      gender: req.body.gender,
	      address: req.body.address,
	      country: req.body.country,
	      state: req.body.state,
	      religions: req.body.religions,
	      knownLanguage: req.body.knownLanguage,
	      tenthPassYear: req.body.tenthPassYear,
	      twelvethPassYear: req.body.twelvethPassYear,
	      graduationCompleteYear: req.body.graduationCompleteYear,
	      maritalstatus: req.body.maritalstatus,
        is_first: false
      }
    }).then((result)=>
    {
      res.json({
        is_error: false,
        message: "profile add successfull!",
      })
        //var error = 
        //{
          //is_error: false,
          //message: "profile add successfull..!!",
        //};    
        console.log("profile add successfull..!!"); 
        //return res.status(500).send(error);
    })
    .catch(err=>
    {
	    var error = 
      {
        is_error: true,
        //message: "Please Retry Again.!",
        message: err,
      };
      console.log(error);
      return res.status(500).send(error);
    })  
}); 

//adding mr
router.post("/addmr", async(req, res) =>
{  // Dropping an Index in MongoDB
    users.mr.collection.dropIndex('email_1', function(err, result) {
    if (err) {
        console.log('Error in dropping index!', err);
    }
    });
    const data = new users.mr({
    _id:new index.mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    profileimg: "https://winaero.com/blog/wp-content/images/mr/2017/12/User-icon-256-blue.png",
    is_first: true
  });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Mr Add successfully..!!",
        };    
        console.log("Mr Add successfull..!!"); 
        return res.status(500).send(error);
    })
    .catch(err=>
    {
	    var error = 
      {
        is_error: true,
        //message: "Please Retry Again.!",
        message: err,
      };
      console.log(error);
      return res.status(500).send(error);
    })
  } 
  catch (e) 
  {
   res.send(e);
  }
});


//fetch all mr
router.post("/ViewAllMr", function (req, res, next) 
{
  var check = users.mr.find();
  check.exec((err, data) => 
  {
    if (err) 
    {
      var error = 
      {
        is_error: true,
        message: err.message,
      };
      return res.status(500).send(error);
    } 
    else 
    {
      if (data == 0) 
      {
        var error = {
          is_error: true,
          message: "Mr not found",
        };
        console.log("Mr not found");
        return res.status(500).send(error);
      } 
      else 
      {
        res.json(data);
        console.log("success");
      }
    }
  });
});

//fetch one mr record
router.post("/search/:name",function(req,res)
{
  //const url = req.protocol + "://" + req.get("host");
  //var f_image;
	users.mr.findOne({username:req.params.name})
	.then((result)=>
  {
    //f_image=url + "/images/mr/" + req.file.path,
    //res.json(f_image);
    //res.sendFile(f_image); 
	  res.json(result)
  })
  .catch((err)=>
  {
	 console.log(err);
  })
})
 
//forgott password
router.post("/forgot-password", function(req, res, next)
{
  var Email = req.body.email;
  var check = users.mr.findOne({ email: Email });
  check.exec((err, data) => 
  {
    if (err) 
    {
      var error = 
      {
        is_error: true,
        message: err.message,
      };
      console.log("1st");
      return res.status(500).send(error);
    } 
    else if (data == null) 
    {
        var error = {
          is_error: true,
          message: "Email is not valid!!",
        };
        console.log("2nd");
        console.log("Email is not valid!!");
        return res.status(500).send(error);
    } 
    else 
    {
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
          user: "aaizolederma123@gmail.com",
          pass: "aaizole123",
        },
      });
      var new_password = randomString();
      var msg = 
        "Dear Aaizole Derma User,\nYour Password is: "+new_password+"\nPlease, secure your password!\nThank You!!";

      var mailOptions = 
      {
        from: "aaizolederma123@gmail.com",
        to: data.email,
        subject: "Aaizol Derma Forgot Password",
        text: msg,
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
          console.log("3rd");
          return res.status(500).send(error);
        }
        else
        {
          console.log(new_password);
          var updatePassword = users.mr.findByIdAndUpdate(
            {_id: data._id},
            {password: new_password}
          );
          updatePassword.exec((err, data)=>{
            if (err) 
            {
              var error = 
              {
                is_error: true,
                message: err.message,
              };
              console.log("4th");
              return res.status(500).send(error);
            }
            else
            {
              var final_data = 
              {
                is_error: false,
                message: "Password Sent to Your Email Id",
              }
              console.log("Password Sent to Your Email Id");
              return res.status(200).send(final_data);
            } 
          })             
        }
      })       
    }
  });
})

module.exports = router;