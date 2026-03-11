const mongoose = require("mongoose");

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
		}
	},
	{
		timestamps: true,
	}
);


const UserModel = mongoose.model("User", UserSchema);


module.exports = {
	UserSchema,
	UserModel
}



