// Import the server from server.js
const {app} = require("./server.js");

// Load up environment variables 
const {loadEnvFile} = require("node:process");
loadEnvFile();

// Connect to the database 
const { dbConnect } = require("./utils/databaseConnectionManager");
dbConnect().then(() => {

	// Run the server
	app.listen(process.env.PORT || 3000, () => {
		console.log("Server is running on http://localhost:3000/");
	});

});
