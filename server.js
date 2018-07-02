const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const books = require('./routes/books');
const users = require('./routes/users');

//We need bodyparser for converting request bodies in to javascript object
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("public"));

app.use("/api/books",books);
app.use("/api/users",users);

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/index.html"))  
})

app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/admin.html"))
})

app.listen(4000,()=>{
   console.log("Server started at port 4000") 
});
