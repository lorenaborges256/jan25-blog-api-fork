const mongoose = require("mongoose");
const { dbConnect, dbDisconnect } = require("../databaseConnectionManager");

async function dbDrop(){
	console.log("Dropping database now...");
	await mongoose.connection.dropDatabase();
	console.log("Database is now dropped!");
}

dbConnect().then(async () => {
	await dbDrop();
	await dbDisconnect();
});


