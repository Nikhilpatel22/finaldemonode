const express = require('express');
const router = require('./routes/router')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('./database/conn')
 


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended : true }));
app.use(bodyParser.json());

app.use('/',router); 
app.get('/register',router);
app.post('/register',router);
app.get('/edit/:id',router);
app.get('/delete/:id',router); 
app.get('/login',router);
app.post('/login',router);

module.exports = app;