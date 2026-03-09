// 1. Load the existing .env if it exists 
// For file read/write, and specifically using the promises version for async/await niceness:
const fs = require("node:fs/promises");
// Import security utilities to generate a JWT secret key!
const cryptography = require("node:crypto");
// Modern replacement of dotenv to load and check our .env values:
const {loadEnvFile} = require("node:process");


// NPM sets the project name to the environment automatically
// and we want to use this in a default MongoDB connection string
if (!process.env.npm_package_name){
	process.env.npm_package_name = "jan25-blog-api";
}
console.log("Default database name will be: " + process.env.npm_package_name);



// Check for any existing environment variables
try {
	loadEnvFile();
	console.log(".env file already exists! We should have more logic about overwriting and cancelling if we don't to overwrite!");
} catch (error) {
	console.log("No .env file exists! We should make one!")
}

// 2. If no .env exists, do the .env setup 

// 2a. Set up default env values:
// env values are like:
// BANANAS=some value
// KEY=VALUE
const defaultEnvValues = {
	// Default server port for use when running the server, 
	// e.g. localhost:3000, 3000 comes from this default value
	PORT: 3000,

	// Default secret key guaranteed to be unique, so others can't guess their way into our system
	JWT_SECRET_KEY: cryptography.randomBytes(64).toString("hex"),

	DATABASE_URL: `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`
}


async function writeToFile(){
	// 3. Loop through our default values defined somewhere already
	let stringToWrite = "";

	// 4. For each value, add it to a string that will become file content 
	// defaultEnvValues.port 
	// PORT=
	for (const key in defaultEnvValues) {
		if (!Object.hasOwn(defaultEnvValues, key)) continue;
		
		// This grabs the value of the key that we are looking at from the object
		const element = defaultEnvValues[key];
		
		// If key is PORT and element is 3000, it will write like this:
		// PORT=3000
		// Better for RAM usage, usually:
		// stringToWrite += `${key}=${defaultEnvValues[key]}`;
		// Better for human readability, usually:
		stringToWrite += `${key}=${element}\n`;
		
	}

		
	

	// 5. Once the string is done / loop is done, write that string to a new .env file 
	// Make sure there's actual content to write 
	stringToWrite = stringToWrite.trim();
	if (stringToWrite.length > 0){
		await fs.writeFile(".env", stringToWrite);
	}
	console.log("Written this content to the .env file:\n" + stringToWrite);
}
writeToFile();

