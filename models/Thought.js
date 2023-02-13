const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction');
import { formatTime } from require('../utils/helpers');

const thoughtSchema = new Schema({
	thoughtBody: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
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
	reactions: [reactionSchema],
});

thoughtSchema.set('toJSON', {
	getters: true,
	virtuals: true,
});

thoughtSchema.virtual('reactionCount').get(() => {
	return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;