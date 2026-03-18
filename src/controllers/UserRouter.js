const express = require("express");
const { checkIfUserIsAdmin, checkIfUserIsTargetingThemselves } = require("../middleware/UserAuthorisation");
const { checkForUserJwt } = require("../middleware/UserAuthentication.js");
const { UserModel } = require("../models/UserModel");
const { PostModel } = require("../models/PostModel");
const { generateJwt } = require("../utils/jwtUtils.js");
const userRouter = express.Router();

// localhost:3000/users/admin/dashboard
userRouter.get(
	"/admin/dashboard",
	checkForUserJwt,
	checkIfUserIsAdmin,
	async (request, response) => {
		let allUsers = await UserModel.find();
		let allPosts = await PostModel.find();

		response.json({
			data: {
				users: allUsers,
				posts: allPosts
			}
		});
	}
);


// POST register/signup route


// POST login/signin route
userRouter.post(
	"/login",
	async (request, response) => {
		// Process request.body for email and password
		// object destructuring!!
		let {email, password} = request.body;
		// Object destructuring is equivalent to declaring variables like below:
		// let email = null;
		// email = request.body.email 

		
		// Use the email to find the relevant user in the DB 
		let foundUser = await UserModel.findOne({email: email});

		if (foundUser == undefined){
			response.json({
				message:"Create an account!"
			});
		}

		// Compare the provided password to the found relevant user 
		let doPasswordsMatch = foundUser.comparePassword(password);
		if (!doPasswordsMatch){
			response.json({
				message:"Invalid email or password."
			});
		}

		// If the user matches, make a JWT and return that JWT 
		let newJwt = generateJwt(foundUser);

		response.json({
			result: newJwt
		});
	}
);

// GET specific user 


// GET all users
// localhost:3000/users/
userRouter.get(
	"/", 
	async (request, response) => {

	}
);


// CREATE new user 
// This is different to register! An admin could make a new user!


// PATCH specific user 
// localhost:3000/users/aosdnalkandva
userRouter.patch(
	"/:userId",
	checkForUserJwt, 
	checkIfUserIsTargetingThemselves,
	async (request, response) => {
		
		let updatedUser = await UserModel.findOneAndUpdate(
			// Argument 1: the search query/filter
			{
				_id: request.customData.user._id
			},
			// Argument 2: the data to apply to the doc to update it
			{
				...request.body
			},
			// Argument 3: options to customise how findOneAndUpdate works
			{
				returnDocument: "after"
			}
		);

		console.log(request.customData);
		console.log(updatedUser);
		console.log(request.customData.user._id)
		console.log(request.customData.id)

		response.json({
			data: updatedUser,
			message:"Update successful!"
		});

	}
);

// DELETE specific user 




module.exports = {
	userRouter
}