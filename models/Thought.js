const { Schema, model, Types } = require('mongoose');
const Reaction = require('./Reaction');
const { formatTime } = require('../utils/helpers.js');

const reactionSchema = Reaction.schema;

const thoughtSchema = new Schema({
	thoughtBody: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 800,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => formatTime(timestamp),
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [
		reactionSchema
	]
});

thoughtSchema.set('toJSON', {
	getters: true,
});

thoughtSchema.set('id', false);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;