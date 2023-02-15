const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomItem, randomSort } = require('./data');
const { usernames , thoughts, reactions, randWords } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('Connected!');
	await User.deleteMany({});
	await Thought.deleteMany({});
	await Reaction.deleteMany({});

	// create 20 users with a random email
	const userPromises = [];
	usernameList = randomSort(usernames);
	for (let i = 0; i < 20; i++) {
		const user = new User({
			username: usernameList[i],
			email: `${getRandomItem(randWords) + [i] + getRandomItem(randWords)}@gmail.com`,
		});
		userPromises.push(user.save());
	}
	const usersArr = await Promise.all(userPromises);

	// create 100 random thoughts for random users
	const thoughtPromises = [];
	for (let i = 0; i < 100; i++) {
		const thought = new Thought({
			thoughtBody: getRandomItem(thoughts),
			username: getRandomItem(usernames),
		});
		thoughtPromises.push(thought.save());
	}
	const thoughtsArr = await Promise.all(thoughtPromises);

	// create 100 random reactions for random users
	const reactionPromises = [];
	for (let i = 0; i < 100; i++) {
		const reaction = new Reaction({
			reactionBody: getRandomItem(reactions),
			username: getRandomItem(usernames),
		});
		reactionPromises.push(reaction.save());
	}
	const reactionsArr = await Promise.all(reactionPromises);

	// add random thoughts to random users
	const userThoughtPromises = [];
	for (let i = 0; i < 20; i++) {
		const user = usersArr[i];
		const thought = getRandomItem(thoughtsArr);
		user.thoughts.push(thought);
		userThoughtPromises.push(user.save());
	}
	await Promise.all(userThoughtPromises);

	// add between 2 and 7 random reactions to random thoughts
	const thoughtReactionPromises = [];
	for (let i = 0; i < 100; i++) {
		const thought = thoughtsArr[i];
		const reactionCount = Math.floor(Math.random() * 6) + 2;
		for (let j = 0; j < reactionCount; j++) {
			// make sure the thought doesn't already have the reaction
			// and that the same user doesn't react twice
			let reaction = getRandomItem(reactionsArr);
			while (thought.reactions.includes(reaction._id) || thought.reactions.includes(reaction.username)) {
				reaction = getRandomItem(reactionsArr);
			}
			thought.reactions.push(reaction);
		}
		thoughtReactionPromises.push(thought.save());
	}
	await Promise.all(thoughtReactionPromises);

	// add between 2 and 10 random friends to random users
	const userFriendPromises = [];
	for (let i = 0; i < 20; i++) {
		const user = usersArr[i];
		const friendCount = Math.floor(Math.random() * 9) + 2;
		for (let j = 0; j < friendCount; j++) {
			// make sure the user doesn't already have the friend
			let friend = getRandomItem(usersArr);
			while (user.friends.includes(friend._id)) {
				friend = getRandomItem(usersArr);
			}
			user.friends.push(friend);
		}
		userFriendPromises.push(user.save());
	}
	await Promise.all(userFriendPromises);

	console.log('Done seeding database!');

});