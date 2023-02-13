const { Schema, model, Types } = require('mongoose');
const { formatTime } = require('../utils/helpers.js');

const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => formatTime(timestamp),
	},
});

reactionSchema.set('toJSON', {
	getters: true,
});

const Reaction = model('Reaction', reactionSchema);

module.exports = { Reaction, reactionSchema }