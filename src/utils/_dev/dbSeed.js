const { PostModel } = require("../../models/PostModel");
const { UserModel } = require("../../models/UserModel");
const { dbConnect, dbDisconnect } = require("../databaseConnectionManager");


async function dbSeed () {

	// User data
	const usersToSeed = [
		{
			username: "seedUser1",
			password: "bananas1",
			email: "test+seed1@email.com",
			isAdmin: false, 
			usersWeFollow: [],
			postsWeReactedTo: []
		},
		{
			username: "seedUser2",
			password: "bananas1",
			email: "test+seed2@email.com",
			isAdmin: true, 
			usersWeFollow: [],
			postsWeReactedTo: []
		},
	];


	// User seeding
	for await (const userData of usersToSeed) {
		await UserModel.create(userData);
	}

	// Users have passwords, passwords are hashed on pre-save hook (TODO!),
	// hooks/middleware won't fire on insertMany, we must loop through user data
	// and create the seed users one by one


	// Post data
	let user1 = await UserModel.findOne({username: usersToSeed[0].username});
	let user2 = await UserModel.findOne({username: usersToSeed[1].username});
	const postsToSeed = [
		{
			title: "Seed Post 1",
			content: "Lorem ipsum",
			authors: [
				user1._id
			]
		},
		{
			title: "Seed Post 2",
			content: "Lorem ipsum",
			authors: [
				user1._id,
				user2._id
			]
		}
	];


	// Post seeding

	// We can use Post.insertMany to seed!
	await PostModel.insertMany(postsToSeed);

}


dbConnect().then(async () => {

	console.log("Seeding the database now!");
	await dbSeed();
	console.log("Database has been seeded!");


	await dbDisconnect();
});