// Connecting and disconnecting from the database 
const mongoose = require("mongoose");
const {loadEnvFile} = require("node:process");
try {
	loadEnvFile();
} catch (error) {
	console.log("No .env file detected!")
	if (process.env.NODE_ENV == "production"){
		console.log("No .env file - this is intentional!");
	}
}

// connect function 
async function dbConnect(){
	let dbUrl = process.env.DATABASE_URL;
	console.log(dbUrl);

	// temporary workaround until Node 25.6.1 is available
	// should be by Wednesday???
	// workaround is to modify expected dns servers
	require('node:dns').setServers(['8.8.8.8', '1.1.1.1']);

	await mongoose.connect(dbUrl);
	console.log("Database connected!");
}

// disconnect function 
async function dbDisconnect(){
	await mongoose.disconnect();
}

module.exports = {
	dbConnect, dbDisconnect
}

