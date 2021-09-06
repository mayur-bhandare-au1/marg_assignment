const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env =require('./config/env')
const url = env.url;

global.__basedir = __dirname;
console.log(__basedir);

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection;

con.on('open',function(){
    console.log("DB Connected ...")})

let router = require('./routers/router')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',router);

app.listen(process.env.PORT || 5000);