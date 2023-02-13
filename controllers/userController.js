const { User, Thought, Reaction } = require('../models');

module.exports = {
	// get all users
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find({});
			console.log(users);
			res.status(200).json(users);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	// get a single user by its _id and populated thought and friend data
	getSingleUser: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id })
				.populate({
					path: 'thoughts',
					// exlude the document version key (__v)
					select: '-__v -reactions',
				})
				.populate({
					path: 'friends',
					select: '-__v -friends -thoughts -friendCount',
				})
				.select('-__v');
			console.log(user);
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.status(200).json(user);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
	// create a new user
	createUser: async (req, res) => {
		try {
			const user = await User.create(req.body);
			res.status(200).json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// update a user by its _id
	updateUser: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				{ new: true, runValidators: true }
			);
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.status(200).json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// delete a user by its _id
	deleteUser: async (req, res) => {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.id });
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			// remove user from friends list of other users
			await User.updateMany({ _id: { $in: user.friends } }, { $pull: { friends: user._id } });
			// remove user's thoughts
			await Thought.deleteMany({ username: user.username });
			// remove user's reactions
			await Reaction.deleteMany({ username: user.username });
			res.status(200).json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// add a new friend to a user's friend list
	addFriend: async (req, res) => {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $addToSet: { friends: req.params.friendId } },
				{ new: true, runValidators: true }
			);
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.status(200).json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
	// delete a friend from a user's friend list
	deleteFriend: async (req, res) => {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $pull: { friends: req.params.friendId } },
				{ new: true, runValidators: true }
			);
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.status(200).json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
};
