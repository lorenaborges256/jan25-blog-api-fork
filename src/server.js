const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

// Allow JSON data to be sent on request bodies
app.use(express.json());

// Do Helmet first so CORS with custom config can overwrite it
app.use(helmet());

// Simple CORS config with default values
// We want to customise the origins to allow only our relevant frontends to reach the API 
let handyCorsConfig = {
	credentials: true,
	origin: [
		"https://yourdeployedfrontenddomain.com",
		"http://localhost"
	]
}
app.use(cors(handyCorsConfig));

app.use((request, response, next) => {
	request.customData = {};

	next();
});






app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the Blog API!"
	});
});

// Attach our controller routers to the server!
const {userRouter} = require("./controllers/UserRouter.js");
app.use("/users", userRouter);

module.exports = {
	app
}




