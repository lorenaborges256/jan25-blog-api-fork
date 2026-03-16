const express = require("express");
const { checkIfUserIsAdmin } = require("../middleware/UserAuthorisation");
const { UserModel } = require("../models/UserModel");
const { PostModel } = require("../models/PostModel");
const userRouter = express.Router();

userRouter.get(
	"/admin/dashboard",
	// checkForUserJwt
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