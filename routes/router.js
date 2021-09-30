const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const multer = require('multer');
const path = require('path');
const flash = require('connect-flash');

router.use(express.static(__dirname+"./public/"))

router.use(flash());

router.use(function(req, res, next){
      res.locals.success_message = req.flash('success_message');
      res.locals.error_message = req.flash('error_message');
      res.locals.error = req.flash('error');
      next();
})

router.get('/',(req, res)=>{
	res.render('index',{title : 'student data'});
})


var storage = multer.diskStorage({
	destination: './public/upload/',
	filename: function(req, file, cb){
	cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var upload = multer({
storage:storage
}).single('file');

router.get('/register',function(req, res, next){
	Student.find({}).exec(function(err,data){
		if(err) throw err;
	res.render('register',{title : 'student data', records : data});
})
})

router.post('/register',upload,function(req, res, next){
	const student = new Student({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password,
		cpassword : req.body.cpassword,
		gender : req.body.gender,
		image:req.file.filename,
	})
	student.save(function(err,req1){
		if(err) throw err;
		Student.find({}).exec(function(err,data){
			if(err)throw err;
			res.render('register',{title : 'student data', records : data})
		})
	})
})

router.get('/delete/:id',function(req, res, next){
	var id = req.params.id;
	var del = Student.findByIdAndDelete(id);
	del.exec(function(err){
	if(err) throw eerr;
	res.redirect('/register');
})
})

router.get('/edit/:id',function(req, res, next){
   var id=req.params.id;
   var edit = Student.findById(id);
	 edit.exec(function(err, data){
		if(err)throw err;
		res.render('edit',{ title : "edit record", records:data})
	})
})

router.post('/update/',upload,function(req, res, next){

if(req.file){

var dataRecords={
  name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	  cpassword : req.body.cpassword,
	  gender : req.body.gender,
		image:req.file.filename,
}
  }else{

    var dataRecords={
    name : req.body.name,
		email : req.body.email,
		password : req.body.password,
	  cpassword : req.body.cpassword,
	  gender : req.body.gender,
	
    }
  }
  var update= Student.findByIdAndUpdate(req.body.id,dataRecords);
  update.exec(function(err, data){
		if(err)throw err;	
	res.redirect('/register');
	})	
})


router.get('/login',(req,res)=>{
	res.render('login',{title : 'student data'});
})

router.post('/login',async(req,res)=>{
	try{
		const email = req.body.email;
		const password = req.body.password;

		const useremail = await Student.findOne({email:email});

		if(useremail.password === password){
			res.render('index',{title : 'student Data'});
		}else{
			res.send("invalid login password");
		}
	}catch(error){
		res.send("invalid login detail");
	}
})

router.get('/logout',(req,res)=>{
   req.logout();
   res.redirect('/login');
})

module.exports = router;