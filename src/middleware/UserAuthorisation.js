

async function checkIfUserIsAdmin(request, response, next){
	// Check if the user is on the request
	// request.customData.user - sorted out by another middleware 
	// before this one runs 


	// Check if the request user has isAdmin set to true 
	if (request.customData.user.isAdmin){
		// Call next 
		next();
	} else {
		// Call response.json
		response.json({
			message:"You need to be an admin to access this API endpoint!"
		});
	}
}

module.exports = {
	checkIfUserIsAdmin
}