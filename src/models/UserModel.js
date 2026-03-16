const mongoose = require("mongoose");
const crypto = require("node:crypto");

const UserSchema = new mongoose.Schema(
	{
		// username, email, etc
		username: {
			unique: true,
			required: true,
			type: String,
			// at least 3 characters long!!
			minLength: [3, "Username too short!"] 
		},
		password: {
			required: true,
			type: String,
			// at least 8 characters long!!
			minLength: [8, "Password too short!"] 
		},
		email: {
			unique: true,
			type: String,
			required: true,
			// should be in an email format
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: false
		},
		usersWeFollow: {
			type: [{
				type: mongoose.Types.ObjectId,
				ref: "User"
			}],
			default: []
		},
		postsWeReactedTo: {
			type: [{
				type: mongoose.Types.ObjectId,
				ref: "Post"
			}],
			default: []
		},
		salt : {
			type: String,
			required: true,
			default: generateSalt
		}
	},
	{
		timestamps: true,
	}
);

function generateSalt(){
	return crypto.randomBytes(64).toString("hex");
}


// 1. Add a middleware/hook to hash the password when the password is updated
UserSchema.pre("save", function (next) {

	// 1. Check if the salt is available for this user
	// 		if not, create a salt!
	if (!this.salt){
		this.salt = generateSalt();
	}

	// Only proceed if the user password was modified!
	if (!this.isModified("password")) return;

	// if we reach this point in the middleware hook, then the password
	// needs to be rehashed!!!

	this.password = crypto.scryptSync(this.password,  this.salt, 64).toString("hex");

	// leaving out next() because it might only be for post hooks nowadays!
	// next();

});


// 2. Compare passwords!
UserSchema.methods.comparePassword = function(incomingPasswordToCheck) {

	if (!this.salt){
		this.salt = generateSalt();
	}


	// Can't compare as-is, 
	// because this.password is hashed and incomingPassword is not hashed
	// if (incomingPasswordToCheck == this.password) 
	// We need to hash incomingPasswordToCheck and see if the hashed version matches!

	let hashedAndSaltedIncomingPassword = crypto.scryptSync(incomingPasswordToCheck, this.salt, 64).toString("hex");

	if (hashedAndSaltedIncomingPassword == this.password){
		// passwords match!
		return true;
	} else {
		// passwords do NOT match!
		return false;
	}
}
// foundUser.comparePassword(request.body.loginpassword)





const UserModel = mongoose.model("User", UserSchema);


module.exports = {
	UserSchema,
	UserModel
}



