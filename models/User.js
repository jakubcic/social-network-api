const { Schema, model } = require('mongoose');
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
			// regex to validate emails
			/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
			'Must use a valid email address',
		],
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
	getters: true,
});

userSchema.set('id', false);

const User = model('User', userSchema);

module.exports = User;
