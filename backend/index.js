const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let router = require('./routers/router')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',router);

app.listen(process.env.PORT || 5000);