const { Thought, User } = require('../models');

module.exports = {
	// get all thoughts
	getAllThoughts: async (req, res) => {
		try {
			// find all thoughts and include reactionCount for each thought
			const thoughts = await Thought.aggregate([
				{
					$addFields: {
						reactionCount: {
							$size: '$reactions',
						},
					},
				},
				{
					$unset: ['__v'],
				},
			]);
			console.log(thoughts);
			res.status(200).json(thoughts);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// get a single thought by its _id
	getSingleThought: async (req, res) => {
		try {
			const thoughtData = await Thought.findOne({ _id: req.params.id })
				.populate({
					path: 'reactions',
					select: '-__v',
				})
				.select('-__v');
			if (!thoughtData) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}
			const thought = thoughtData.toObject();
			thought.reactionCount = thought.reactions.length;
			res.status(200).json({ thought });
			console.log(thought);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
	// create a new thought
	createThought: async (req, res) => {
		try {
			// only create thought for a valid user
			const userList = await User.find();
			const userNames = userList.map((user) => user.username);
			if (!userNames.includes(req.body.username)) {
				res.status(404).json({ message: `No user found with username ${req.body.username}` });
				return;
			}
			const thought = await Thought.create(req.body);
			// push the created thought's _id to the associated user's thoughts array
			await User.findOneAndUpdate(
				{ username: req.body.username },
				{ $push: { thoughts: thought._id } },
				{ new: true }
			);
			res.status(200).json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// update a thought by its _id
	updateThought: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			if (!thought) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}
			res.status(200).json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// delete a thought by its _id
	deleteThought: async (req, res) => {
		try {
			const thought = await Thought.findOneAndDelete({ _id: req.params.id });
			if (!thought) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}
			res.status(200).json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// create a reaction stored in a single thought's reactions array field
	createReaction: async (req, res) => {
		try {
			// only create reaction for a valid thought
			const thoughtList = await Thought.find();
			// get an array of thought ids
			const thoughtIds = thoughtList.map((thought) => thought._id);
			// convert the array of ObjectIds to a string for each one
			const thoughtIdString = thoughtIds.map((id) => id.toString());
			if (!thoughtIdString.includes(req.params.id)) {
				res.status(404).json({ message: `No thought found with id ${req.params.id}` });
				return;
			}
			// only create reaction for a valid user
			const userList = await User.find();
			const userNames = userList.map((user) => user.username);
			if (!userNames.includes(req.body.username)) {
				res.status(404).json({ message: `No user found with username ${req.body.username}` });
				return;
			}
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { reactions: req.body } },
				{ new: true }
			)
				.select('-__v -_id')
				.populate({ path: 'reactions', select: '-__v -_id' });
			newestReaction = updatedThought.reactions[updatedThought.reactions.length - 1];
			// return 200 status and the last item in the reactions array in the updatedThought object
			res.status(200).json(newestReaction);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
	// delete a reaction by the reaction's reactionId value
	deleteReaction: async (req, res) => {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.id },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ new: true }
			);
			if (!thought) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}
			res.status(200).json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},
};
