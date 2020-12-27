const index = require("../index");
const express = require("express");
const users = require("../models/model");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const async = require('async');

const DIR = "./images/about-us/";

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

//update Our Team without image
router.post("/upTeams",function(req,res){
     users.aboutus.updateOne({name:req.body.name1},{$set:{
         name:req.body.name,
         profession: req.body.profession
   }
}).then((result)=>{
	res.json(result)
    
})
.catch((err)=>{
	console.log(err);
})
})

//update Our Team with image
router.post("/updateourTeam", upload.single('image'), async(req, res) =>
{ 
  const url = req.protocol + "://" + req.get("host");
  var img;  
  if(!req.file)
  {
	  users.aboutus.findOne({name:req.body.name})
	  .then((result)=>
    {
      console.log(result);
      img=result.image;
    
    })
    .catch((err)=>
    {
	    console.log(err);
    })
  }
  else
  {
    img= url + "/images/about-us/" + req.file.filename,
    console.log(img);
  }
    users.aboutus.updateOne({name: req.body.name1},
    {
      
      $set:
      {
        image:img,
        name: req.body.name,
        profession: req.body.profession
      }
    }).then((result)=>
    {
      res.json({
        is_error: false,
        message: "Team Update successfull!",
      }) 
        console.log("Team Update successfull..!!"); 
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

//adding ourteam
router.post("/add-our-team", upload.single('image'), async(req, res) =>
{  
    const url = req.protocol + "://" + req.get("host");
    var img;
    if(!req.file)
    {
      if(req.body.gender=="Male"||req.body.gender=="male")
      
      img = "https://www.kindpng.com/picc/m/490-4904536_user-3d-icon-png-transparent-png.png";
      
      else
      img = "https://f0.pngfuel.com/png/255/44/woman-wearing-blue-suit-cector-png-clip-art.png";
    }
    else
    {
      img= url + "/images/about-us/" + req.file.filename,
      console.log(img);
    }
    const data = new users.aboutus({
    _id:new index.mongoose.Types.ObjectId(),
    name: req.body.name,
    profession: req.body.profession,
    gender: req.body.gender,
    image: img
    });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Team Add successfully..!!",
        };    
        console.log("Team Add successfull..!!"); 
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

//fetch Our Team
router.post("/view-team", function (req, res, next) 
{
  var check = users.aboutus.find();
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
          message: "Team not found",
        };
        console.log("Team not found");
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

//delete our team
router.post("/deleteTeam",function(req,res){
	users.aboutus.deleteOne({name:req.body.name}).then((result)=>{
		res.json(result);
	})
	.catch((err)=>{console.log(err);})
})

module.exports = router;