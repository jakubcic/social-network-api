const { Schema, model, Types } = require('mongoose');
import { obfuscate } from '../utils/helpers.js';

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
			/^[A-Z0-9+_.-]+(?:\.[A-Z0-9+_.-]+)*@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*$/,
			'Must use a valid email address',
		],
		// regex to validate emails:
		// no leading, trailing, or consecutive dots, no spaces, no special characters beyond +_.-
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

// get total count of friends
userSchema.virtual('friendCount').get(() => {
	return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;