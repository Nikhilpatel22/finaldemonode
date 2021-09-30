const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nikhil',{
	useUnifiedTopology : true,
	useNewUrlParser : true
})
.then(()=>{
	console.log('connection successfull')
}).catch((error)=>{
	console.log(error);
})