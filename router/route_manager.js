const index = require("../index");
const express = require("express");
const users = require("../models/model");
const async = require('async');
const router = express.Router();


//login api for mr & manager
router.post("/login", function (req, res, next) 
{
  const mrcompanycode = "AD164937";
  const managercompanycode = "AD8219";
  var companycode = req.body.companycode;
  var Username = req.body.username;
  var Password = req.body.password;
    var check;
  if(companycode == mrcompanycode){
     check = users.mr.findOne({ username: Username });
  }
  else 
  {
    if(companycode == managercompanycode){
     check = users.manager.findOne({ username: Username});}
  }
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
      if (data == null) 
      {
        var error = {
          is_error: true,
          message: "Username and Password are Invalid!!",
        };
        console.log("Login Unsuccess..!!");
        return res.status(500).send(error);
      } 
      else 
      {
        var check_pass = data.password;
        if (Password === check_pass) 
        {
          if(companycode == mrcompanycode){
            delete data.password;
            var finaldata = 
            {
              //data: data,
              is_error: false,
              //message: "Login Successfull!!",
              message: "Mr",
            };
            console.log("Login success..!!");
            return res.status(200).send(finaldata);
          }
          else {
            if(companycode == managercompanycode) {
              var finaldata = 
              {
                //data: data,
                is_error: false,
                //message: "Login Successfull!!",
                message: "Manager",
              };
              console.log("Login success..!!");
              return res.status(200).send(finaldata);
            }
          }
        } 
        else 
        {
          var error = 
          {
            is_error: true,
            message: "Username and Password are Invalid!!",
          };
          console.log("Login Unsuccess..!!");
          return res.status(500).send(error);
        }
      }
    }
  });
});

router.post("/addprofile", async(req, res) =>
{
  const data = new users.manager({
    _id:new index.mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    mobileno: req.body.mobileno,
    email: req.body.email,
    about: req.body.about
  });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Add profile successfull..!!",
        };    
        console.log("Add profile successfull..!!"); 
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
module.exports = router;