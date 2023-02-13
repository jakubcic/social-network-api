const { Schema, model, Types } = require('mongoose');
const { obfuscate } = require('../utils/helpers.js');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true, // remove whitespace
	},
	email: {
		type: String,
		get: obfuscate, // obfuscate email address when retrieving data
		required: true,
		unique: true,
		trim: true,
		match: [
			/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
			'Must use a valid email address',
		],
		// regex to validate emails
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Thought',
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

userSchema.set('toJSON', {
	virtuals: true,
	getters: true,
});

userSchema.set('id', false);

// get total count of friends
// userSchema.virtual('friendCount').get(function() {
// 	return this.friends.length;
// });

const User = model('User', userSchema);

module.exports = User;
