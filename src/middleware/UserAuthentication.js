const { UserModel } = require("../models/UserModel");


async function checkForUserJwt (request, response, next) {
	// Read the Authorization header from the incoming request
	// Because the frontend should've put the auth token in a header
	let bearerToken = request.headers["authorization"];
	console.log(request.headers);

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
		let loggedInUser = await UserModel.findById(decodedToken.payload.userId);

		// Attach them to the request
		request.customData.user = loggedInUser;


		next();
	} catch (error) {
		response.json({
			message:"You are not logged in!"
		});
	}
}

module.exports = {
	checkForUserJwt
}