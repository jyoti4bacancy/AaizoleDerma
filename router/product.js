const index = require("../index");
const express = require("express");
const users = require("../models/model");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const async = require('async');

const DIR = "./images/product/";

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

//add product main range
router.post("/add-product-range", upload.single('image'), async(req, res) =>
{  
    const url = req.protocol + "://" + req.get("host");
    var img = url + "/images/product/" + req.file.filename;  
    const data = new users.productrange({
    _id:new index.mongoose.Types.ObjectId(),
    name: req.body.name,
    image: img
  });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Product Range Add successfully..!!",
        };    
        console.log("Product Range Add successfull..!!"); 
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


//fetch all Only Main ranges
router.post("/view-product-range", function (req, res, next) 
{
  var check = users.productrange.find();
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
          message: "Product Range not found",
        };
        console.log("Product Range not found");
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

//fetch Only product sub_cat range
router.post("/view-product-sub-range/:productrange_name",function(req,res)
{
  //console.log("HYYYY");
	users.productsubrangeinfo.find({productrange_name:req.params.productrange_name})
  .distinct("sub_cat_name")
	.then((result)=>
  {
	  res.json(result);
    console.log(result);
  })
  .catch((err)=>
  {
	 console.log(err);
  })
})

//fetch whole sub cat range and its info
router.post("/view-product-sub-range-data", function (req, res) 
{
  users.productsubrangeinfo.find({productrange_name: req.body.productrange_name})
  .distinct("sub_cat_name")
  .then((result)=>
  { 
    for(var i=0;i<result.length;i++)
    {
      console.log(result[i]);
      //res.json(result[i]);
      users.productsubrangeinfo.find({sub_cat_name:result[i]},{"image":1, "product_name":1, "benefits":1, "composition":1, "presentation":1, "_id":0})
      .then((result2) =>
      {
        console.log(result2);
      })
    }
    res.json(result);
  })
  .catch((err)=>
  {
	 console.log(err);
  })  
});

//fetch product sub_cat range info
router.post("/view-product-sub-range-info/:sub_cat_name",function(req,res)
{
	users.productsubrangeinfo.find({sub_cat_name:req.params.sub_cat_name})
  .select({"image":1, "product_name":1, "benefits":1, "composition":1, "presentation":1, "_id":0})
	.then((result)=>
  {
	  res.json(result);
    console.log(result);
  })
  .catch((err)=>
  {
	 console.log(err);
  })
})

//fetch product info
router.post("/product-info",function(req,res)
{
	users.productsubrangeinfo.find({productrange_name:req.body.productrange_name, sub_cat_name:req.body.sub_cat_name,product_name: req.body.product_name})
  .select({"image":1, "product_name":1, "benefits":1, "composition":1, "presentation":1, "_id":0})
	.then((result)=>
  {
	  res.json(result)
  })
  .catch((err)=>
  {
	 console.log(err);
  })
})

//add product sub range and info
router.post("/add-product-sub-range-info", upload.single('image'), async(req, res) =>
{  
    const url = req.protocol + "://" + req.get("host");
    var img = url + "/images/product/" + req.file.filename;  
    const data = new users.productsubrangeinfo({
    _id:new index.mongoose.Types.ObjectId(),
    productrange_name: req.body.productrange_name,
    sub_cat_name: req.body.sub_cat_name,
    product_name: req.body.product_name,
    benefits: req.body.benefits,
    composition: req.body.composition,
    presentation: req.body.presentation,
    image: img
  });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Product Sub Range Add successfully..!!",
        };    
        console.log("Product Sub Range Add successfull..!!"); 
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

//delete main one range
router.post("/delete-product-range",function(req,res){
	users.productrange.deleteOne({name:req.body.name}).then((result)=>{
  
      users.productsubrangeinfo.deleteOne({productrange_name:req.body.name}).then((result1)=>{
        res.json(result1);
      }).catch((err)=>{console.log(err);})
   
		res.json(result);
	})
	.catch((err)=>{console.log(err);})
})

//delete sub one range
router.post("/delete-product-sub-range",function(req,res){
	users.productsubrangeinfo.deleteOne({productrange_name:req.body.productrange_name, sub_cat_name:req.body.sub_cat_name})
  .then((result)=>{
		res.json(result);
	})
	.catch((err)=>{console.log(err);})
})

//delete product
router.post("/delete-product",function(req,res){
	users.productsubrangeinfo.deleteOne({productrange_name:req.body.productrange_name, sub_cat_name:req.body.sub_cat_name,product_name: req.body.product_name})
  .then((result)=>{
		res.json(result);
	})
	.catch((err)=>{console.log(err);})
})

module.exports = router;