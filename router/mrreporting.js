const index = require("../index");
const express = require("express");
const users = require("../models/model");
const router = express.Router();
const async = require('async');
const { response } = require("express");

//Master page
//add doctor
router.post("/add-doctor", async(req, res) =>
{   
    const data = new users.doctorinfo({
    _id:new index.mongoose.Types.ObjectId(),
    drname: req.body.drname,
	surname: req.body.surname,
	speciality: req.body.speciality,
	gender: req.body.gender,
	dob: req.body.dob,
	doa: req.body.doa,
	address: req.body.address,
	chemistname:req.body.chemistname,
	city: req.body.city,
	mobileno: req.body.mobileno
  });
 try 
  {
    const result = await data.save().then((result)=>
    {
        var error = 
        {
          is_error: false,
          message: "Doctor Add successfully..!!",
        };    
        console.log("Doctor Add successfull..!!"); 
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


//fetch all doctor
router.post("/view-all-doctor", function (req, res, next) 
{
  var check = users.doctorinfo.find();
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
          message: "Doctor not found",
        };
        console.log("Doctor not found");
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

//fetch one doctor
router.post("/search/:drname",function(req,res)
{
  var regex=new RegExp(req.params.drname,'i');
	users.doctorinfo.find({drname:regex})
	//users.doctorinfo.findOne({drname:req.params.drname})
	.then((result)=>
  {
	  res.json(result)
  })
  .catch((err)=>
  {
	 console.log(err);
  })
})
 
//Reporting page
//fetch dr in list with few fields
router.post("/view-all-doctor-few-field", function (req, res, next) 
{
  var check = users.doctorinfo.find().select({"drname":1, "surname":1, "speciality":1, "city":1, "_id":0});
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
          message: "Doctor not found",
        };
        console.log("Doctor not found");
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

//save button in reporting tab
router.post("/add-reporting", async(req, res) =>
{ var check = users.reporting.find().select({"dod":1, "_id":0});
var res1;
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
    else{
    res1=data.filter(doc=>{
      return dates.compare(data.dod,req.body.dod)
      
        //console.log("date");
       
        //response.send("You already reporting in this date. Please select proper date..!");
      
    })
    console.log(res1);
  }
    //console.log(res1);
})
 
    const data = new users.reporting({
    _id:new index.mongoose.Types.ObjectId(),
    drname: req.body.drname,
    dod: req.body.dod,
    joinwork: req.body.joinwork,
    no_of_doctor_select: req.body.no_of_doctor_select
	
  });
  try 
  {
   
      if (res1.length===0) 
      {
        const result = await data.save().then((result)=>
        {
          var error = 
          {
            is_error: false,
            message: "Data Add successfully..!!",
          };    
          console.log("Data Add successfull..!!"); 
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
      else{
        response.send("You already reporting in this date. Please select proper date..!");
      }
    
  } 
  catch (e) 
  {
   res.send(e);
  }
});

//no. of doctor selected in home page
router.post("/no-of-doctor-select", function (req, res, next) 
{
  var check = users.reporting.find().select({"no_of_doctor_select":1, "dod":1, "_id":0});
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
      var no_of_doc_call =0;
      //var field_work = 0;
      if (data == 0) 
      {
        var error = {
          is_error: true,
          message: "doctor not selected",
        };
        console.log("Doctor not selected");
        return res.status(500).send(error);
      } 
      else 
      {
        const result=data.filter(doc=>{
           //console.log(doc.no_of_doctor_select);
           //console.log(doc.dod.getDate()-1);
           var date = doc.dod.getDate()-1;
           if(date===1)  
            {
              no_of_doc_call = 0;
            }

            no_of_doc_call += doc.no_of_doctor_select;
        })
        console.log(no_of_doc_call);
        res.json(no_of_doc_call);
        console.log("success");
      }
    }
  });
});

//total join work day
router.post("/join-work-day", function (req, res, next) 
{
  var check = users.reporting.find().select({"joinwork":1, "dod":1, "_id":0});
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
      var join_work_day =0;
      
      if (data == 0) 
      {
        var error = {
          is_error: true,
          message: "Join Work not done",
        };
        console.log("Join Work not done");
        return res.status(500).send(error);
      } 
      else 
      {
        const result=data.filter(doc=>{
          //console.log(doc);
           //console.log(doc.no_of_doctor_select);
          
           var date = doc.dod.getDate()-1;
           var month = doc.dod.getMonth();
           var previousmonth= doc.dod.getMonth()-1;
           //console.log(month);
            // if(doc.joinwork!=null){
            //   console.log(doc.joinwork);
            //   join_work_day+=1;
            // }
            // if(date===1)  
            // {
            //   join_work_day = 0; 
            // }
            if(month!=previousmonth && date===1&& doc.joinwork.length!==0 ){
             join_work_day = 1; 
            }
             else if(month!=previousmonth&&doc.joinwork.length===0 && date===1){
               join_work_day=0;
             }
            else if(doc.joinwork.length===0 && date!=1){
                console.log("data  null");
                join_work_day+=0;
              }
              else if( doc.joinwork.length!==0 && date!=1){
                console.log("data not null");
                join_work_day+=1;
              }
              else{
                console.log('ddd');
              }

        })

        //console.log(join_work_day);
        res.json(join_work_day);
        console.log("success");
      }
    }
  });
});

//field work
router.post("/field-work", function (req, res, next) 
{
  var check = users.reporting.find().select({"no_of_doctor_select":1, "dod":1, "_id":0});
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
      var field_work =0;
      
      if (data == 0) 
      {
        var error = {
          is_error: true,
          message: "field work not added",
        };
        console.log("field work not added");
        return res.status(500).send(error);
      } 
      else 
      {
        const result=data.filter(doc=>{
        
           var date = doc.dod.getDate()-1;
           var previousdate = doc.dod.getDate()-2;
           var month = doc.dod.getMonth();
           var previousmonth= doc.dod.getMonth()-1;
           var year = doc.dod.getFullYear();
           var previousyear= doc.dod.getFullYear()-1;

          //if(date!=previousdate){
            if(year!=previousyear && month!=previousmonth && date===1 && doc.no_of_doctor_select!==0 ){
              field_work =1;

              
             }
              
            else if(doc.no_of_doctor_select!==0 && date!=1){
                 //console.log("data  null");
                 field_work +=1;
               }
               
               else{
                 console.log('ddd');
               }  
          //} 
          // else{
          //   response.send("You already reporting in this date. Please select proper date..!");
          // }         

        })

        //console.log(join_work_day);
        res.json(field_work);
        console.log("success");
      }
    }
  });

});



module.exports = router;