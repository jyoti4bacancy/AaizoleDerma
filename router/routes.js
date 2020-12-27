const index=require("../index");
const express = require("express");
const router = express.Router();

//add_item
router.post("/additem", function(req, res){
	
const data=new index.item({
		_id:new index.mongoose.Types.ObjectId(),
		item_name:req.body.item_name,
		item_price:req.body.item_price,
		img_url:req.body.img_url
});
data.save().then((result)=>{ 
	console.log(result);
})
.catch(err=>{
	console.log(err);
}) 
});  


//del_item
router.delete("/deleteitem/:name",function(req,res){
	index.item.deleteOne({item_name:req.params.name}).then((result)=>{
		res.json(result);
	})
	.catch((err)=>{console.log(err);})
})



//fetch_item
router.get('/',function(req, res){
  index.item.find().then((data)=>{   //then is used for promising the data
      res.json(data)
   })
	
});

//update
router.put("/change/:id",function(req,res){
     index.item.updateOne({_id:req.params.id},{$set:{
	
		item_name:req.body.item_name,
		item_price:req.body.item_price,
		img_url:req.body.img_url   
   }
}).then((result)=>{
	res.json(result)
})
.catch((err)=>{
	console.log(err);
})
})


//search
router.get("/search/:name",function(req,res){
	var regex=new RegExp(req.params.name,'i');
	//index.item.find({item_name:regex})
	index.item.find({username:regex})
	.then((result)=>{
	 res.json(result)
 })
 .catch((err)=>{
	 console.log(err);
 })
 })

 
 module.exports = router;