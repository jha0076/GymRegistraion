var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongouser:1234@ac-jx3qzdm-shard-00-00.7nbr1mj.mongodb.net:27017,ac-jx3qzdm-shard-00-01.7nbr1mj.mongodb.net:27017,ac-jx3qzdm-shard-00-02.7nbr1mj.mongodb.net:27017/?ssl=true&replicaSet=atlas-opcq7j-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var name = req.body.name;
   var age =req.body.age;
   var pass = req.body.password;
   var phone =req.body.phone;

   var data = {
      "name": name,
      "age":age,
      "password":pass,
      "phone":phone
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})

app.get('/',function(req,res){
    //const user = await userModel.find({id: 123});
   
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");