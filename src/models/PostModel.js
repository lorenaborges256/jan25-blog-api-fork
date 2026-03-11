const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true
		},
		content: {
			type: String,
			unique: false,
			required: true
		},
		authors: {
			type: [{
				type: mongoose.Types.ObjectId,
				ref: "User"
			}],
			default: [],
			required: true,
			unique: false
		},
		reactionCounter: {
			type: Number,
			default: 1,
			min: [
				0, // Value that is the lowest allowed value
				"Can't have negative reaction counts!" // Message thrown if value is attempted to go lower than min
			],
			required: true,
			unique: false
		}
	}, 
	{
		timestamps: true
	}
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = {
	PostSchema,
	PostModel
}