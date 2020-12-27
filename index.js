const express = require('express');
const app = express();
const mongoose = require("mongoose");
const users = require("./models/model");
const Cors = require("cors");
const parser = require('body-parser');
//const {MongoClient} = require('mongodb');
const async = require('async');
const router1 = require("./router/route_manager");
const router2 = require("./router/route_mr");
const router3 = require("./router/contactus");
const router4 = require("./router/trade");
const router5 = require("./router/product");
const router6 = require("./router/aboutus");
const router7 = require("./router/mrreporting");
const jsonparser = parser.json();

//sapp.use(express.static(__dirname + '/images/'));
//app.use("/public", express.static("public"));
app.use("/images", express.static("images"));
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json());
app.use(Cors()); 

mongoose.connect("mongodb+srv://avenger:mrBkADuNVJEZmMme@cluster0-aht8c.mongodb.net/AaizoleDerma?retryWrites=true&w=majority",
{
	useNewUrlParser:true,	useUnifiedTopology:true, useCreateIndex:true,  useFindAndModify: false 
});

app.use("/route_manager",router1);
app.use("/route_mr",router2);
app.use("/contactus", router3);
app.use("/trade", router4);
app.use("/product",router5);
app.use("/aboutus",router6);
app.use("/mrreporting",router7);

module.exports.express = express;
module.exports.app = app;
module.exports.mongoose = mongoose;
module.exports.users = users;
module.exports.Cors = Cors;
module.exports.parser = parser;
module.exports.jsonparser = jsonparser;

app.listen(5300, function () {
  console.log("Listening On Port 5300!");
});

 