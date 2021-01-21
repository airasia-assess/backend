const express = require("express");
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');

const app = express();
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());
app.get('/',function(req,res){
    res.status(200).send(`Welcome to airasia super assessment.`);
});

const port = process.env.port || 1026;
const http = require('http').createServer(app);
const server = http.listen(port, () => console.log('server started on port', port));