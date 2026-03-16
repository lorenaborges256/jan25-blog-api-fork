# jan25-blog-api
Blog API for the "ExpressJS Build an API" Ed content.

## API Features 

- /users
	- GET /
		- Get all users from database
	- GET /:userId
		- Get one user from database
	- POST /
		- Make a new user in the database
	- PATCH /:userId
		- Update a specific user in the database
		- Require a JWT of the user being updated (e.g. updating your own account) or an admin
	- DELETE /:userId
		- Delete a specific user in the database 
		- Require a JWT of the user being deleted (e.g. closing your own account) or an admin
	- GET /username/:targetUsername
		- Search for a user by their username 
		- Not essential
	- GET /email/:targetEmail
		- Search for a user by their email address
		- Not essential
	- GET /search
		- Search for a user by a given set of data in a query string 
			- e.g. localhost:3000/users/search?username=alex&isAdmin=false
		- Not essential
	- GET /me/reactedposts
		- Show a list of all posts that we reacted to ourselves
		- Requires an auth header / JWT 
		- Not essential
	- GET /:userId/reactedposts
		- Show a list of all posts that the target user has reacted to 
		- Not essential

- /posts
	- GET /
		- Get all posts from database
	- GET /:postId
		- Get one post from database
	- POST /
		- Make a new post in the database
		- Require a JWT of either the author of the post or an admin
	- PATCH /:postId
		- Update a specific post in the database
		- Require a JWT of either the author of the post or an admin
	- DELETE /:postId
		- Delete a specific post in the database  
		- Require a JWT of either the author of the post or an admin
	- GET /search
		- Search for a post by a given set of data in a query string 
			- e.g. localhost:3000/posts/search?author=alex&title=bananas
			- e.g. localhost:3000/posts/search?author=12038uh2eowglknsdfgs&title=bananas
		- Not essential
	- PUT /reactioncounter/:postId
		- Requires a JWT header of the user making the reaction
		- Replace the postID reaction counter with reaction counter + 1
		- Modify the user from the JWT to make sure this post is in their reacted posts array 
		- Not essential 


## Database Entities 

All properties of all entities are required!

### User 

- email: String, email address for the purpose of validation!, unique
- password: String, hashed and salted value at all times!, plaintext should have min length of 8
	- validate in request middleware
- isAdmin: Boolean, default false 
- username: String, unique, at least 3 characters long
- usersWeFollow: array of foreign keys to Users - HYPOTHETICAL, may not implement
- postsWeReactedTo: array of foreign keys to Posts 

### Posts

- title: String, unique
- content: String
- authors: array of foreign keys to Users
- reactionCounter: number, minimum of 1, user can click to react as much as they want, authors are already reacting to their own posts by default forcing a minimum of 1


## Project Setup

### NPM Script Commands 

- NPM script commands 
- Project dependencies 
- Seed & similar files 

### Database Setup 

- MongoDB Atlas usage 


### Features

- User Authentication and Authorisation
	- JWTs
		- Make generateJWT function
		- Make verifyJWT function
		- Make a login route for the user that makes a JWT 
		- Make middleware that runs verifyJWT
	- Middleware
		- isUserAdmin middleware
		- isUserLoggedIn middleware 
		- verifyJwt middleware 
- Post CRUD 
- User CRUD
