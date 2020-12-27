const mongoose=require("mongoose");
/*let userscheme=new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:String,
	email:String,
	address:String,
	password:String
});
 let foodschema=new mongoose.Schema({
 	_id:mongoose.Schema.Types.ObjectId,
 	item_name:String,
 	item_price:Number,
 	img_url:String
});
//module.exports=mongoose.model("users",userscheme);
//module.exports=mongoose.model("foods",foodschema);
*/
let ManagerInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	username:{type:String, required:true},
	password:{type:String, unique:true, required:true},
	firstname:{type:String, required:true},
	middlename:{type:String, required:true},
	lastname:{type:String, required:true},
	mobileno:{type:Number, required:true},
	email:{type:String, unique:true, required:false},
	about:{type:String, required:false}
});
var manager = mongoose.model("tblmanagers",ManagerInfo); //table name is always plural and in lowercase

let MrInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	username:{type:String, required:true},
	password:{type:String, unique:true, required:true},
	profileimg:{type:String, required:false},
	firstname:{type:String, required:false},
	middlename:{type:String, required:false},
	lastname:{type:String, required:false},
	mobileno:{type:Number, required:false},
	email:{type:String, unique:true, required:false},
	dob:{type:String, required:false},
	city:{type:String, required:false},
	previouscompany:{type:String, required:false},
	experience:{type:String, required:false},
	fathersmobileno:{type:Number, required:false},
	gender:{type:String, required:false},
	address:{type:String, required:false},
	country:{type:String, required:false},
	state:{type:String, required:false},
	religions:{type:String, required:false},
	knownLanguage:{type:String, required:false},
	tenthPassYear:{type:Number, required:false},
	twelvethPassYear:{type:Number, required:false},
	graduationCompleteYear:{type:Number, required:false},
	maritalstatus:{type:Boolean, default:true},
	is_first:{type:Boolean, default:true}
});
var mr = mongoose.model("tblmrs",MrInfo);

let AboutUs = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	name:{type:String, required:true},
	image:{type:String, required:false},
	gender:{type:String, required:true},
	profession:{type:String, required:true}
	
});
var aboutus = mongoose.model("tblaboutus",AboutUs);

let ContactUsInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	firstname:{type:String, required:true},
	lastname:{type:String, required:true},
	mobileno:{type:Number, required:true},
	email:{type:String, required:true},
	requirements:{type:String, required:true}
	
});
var contactus = mongoose.model("tblcontactus",ContactUsInfo);

let TradeInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	firstname:{type:String, required:true},
	lastname:{type:String, required:true},
	address:{type:String, required:true},
	city:{type:String, required:true},
	state:{type:String, required:true},
	country:{type:String, required:true},
	email:{type:String, required:true},
	mobileno:{type:Number, required:true},
	currentprofile:{type:String, required:true},
	companyname:{type:String, required:true},
	reference:{type:String, required:true},
	dermafieldexperience:{type:String, required:true},
	segment:{type:String, required:true},
	comment:{type:String, required:false}
});
var trade = mongoose.model("tbltrade",TradeInfo);

let ProductRange = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	name:{type:String,unique:true, required:true},
	image:{type:String, required:true}
});
var productrange = mongoose.model("tblproductrange",ProductRange);

let ProductSubRangeInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	productrange_name:{type:String, required:true},
	sub_cat_name:{type:String, required:true},
	product_name:{type:String, unique:true, required:true},
	benefits:{type:[String], required:false},
	composition:{type:[String], required:false},
	presentation:{type:[String], required:false},
	image:{type:String, required:false}
});
var productsubrangeinfo = mongoose.model("tblproductsubrangeinfo",ProductSubRangeInfo);

//doctor list
let DoctorInfo = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	drname:{type:String, required:true},
	surname:{type:String, required:true},
	speciality:{type:String, required:true},
	gender:{type:String, required:true},
	dob:{type:String, required:false},
	doa:{type:String, required:false},
	address:{type:String, required:true},
	chemistname:{type:String, required:true},
	city:{type:String, required:true},
	mobileno:{type:Number, required:false}
});
var doctorinfo = mongoose.model("tbldoctorinfo",DoctorInfo);

//reporting
let Reporting = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	dod:{type:Date, required:true},
	drname:{type:[String], required:true},
	joinwork:{type:[String], required:false},
	no_of_doctor_select:{type:Number, required:true}	
});
var reporting = mongoose.model("tblreporting",Reporting);


module.exports = 
{
	manager: manager,
	mr: mr,
	aboutus: aboutus,
	contactus: contactus,
	trade: trade,
	productrange: productrange,
	productsubrangeinfo: productsubrangeinfo,
	doctorinfo,
	reporting
}