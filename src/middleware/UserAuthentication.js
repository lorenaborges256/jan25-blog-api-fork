const { UserModel } = require("../models/UserModel");
const { verifyJwt } = require("../utils/jwtUtils");


async function checkForUserJwt (request, response, next) {
	// Read the Authorization header from the incoming request
	// Because the frontend should've put the auth token in a header
	let bearerToken = request.headers["authorization"];
	console.log(request.headers);

	if (bearerToken == undefined){
		return response.status(401).json({
			message:"Log in to view this resource!"
		});
	}

	// Server receives "Bearer aoljscvnsalognsldgksndgslkn"
	// To have a usable token variable, remove "Bearer " from the auth header
	bearerToken = bearerToken.substring(7);
	console.log(bearerToken);

	try {
		// Pass the provided token into our verify function
		let decodedToken = verifyJwt(bearerToken);
		// if we haven't thrown an error by this line,
		// the user is logged in and allowed to proceed
		console.log(decodedToken);

		// Find the user and attach them to the request
		let loggedInUser = await UserModel.findById(decodedToken.userId);

		// Attach them to the request
		request.customData.user = loggedInUser;
		request.customData.id = loggedInUser.id;


		next();
	} catch (error) {
		console.log(error);
		response.status(403).json({
			message:"You are not logged in!"
		});
	}
}

module.exports = {
	checkForUserJwt
}