const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	name : {
		type : String	
	},
	email : {
		type : String
	},
	password : {
		type : String	
	},
	cpassword : {
		type : String	
	},
	gender : {
		type : String	
	},
	image : {
		type : String	
	},
})

module.exports = mongoose.model('Student',studentSchema);



