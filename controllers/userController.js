const { User, Thought, Reaction } = require('../models');

module.exports = {
	// get all users
	getAllUsers: async (req, res) => {
		try {
			// find all users and include friendCount for each user
			const users = await User.aggregate([
				{
					$addFields: {
						friendCount: {
							$size: '$friends',
						},
					},
				},
				{
					$unset: ['__v'],
				},
			]);
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
			const userData = await User.findOne({
				_id: req.params.id,
			})
				.populate({
					path: 'friends',
					select: '-__v -thoughts -friends',
				})
				.populate({
					path: 'thoughts',
					select: '-__v',
				})
				.select('-__v');
			// add friendCount to user object
			if (!userData) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			const user = userData.toObject();
			user.friendCount = user.friends.length;
			res.status(200).json({ user });
			console.log(user);
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
