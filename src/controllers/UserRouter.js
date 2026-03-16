const express = require("express");
const { checkIfUserIsAdmin } = require("../middleware/UserAuthorisation");
const { checkForUserJwt } = require("../middleware/UserAuthentication.js");
const { UserModel } = require("../models/UserModel");
const { PostModel } = require("../models/PostModel");
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

module.exports = {
	userRouter
}