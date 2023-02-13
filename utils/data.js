// seed data for testing
const usernames = [
	'skywalker77',
	'jedinights',
	'orangeSolo1',
	'jedimaster2005',
	'wookieePilot',
	'frodoSwaggins',
	'gandalf_the_greatest',
	'thranduil_3ats_b4con',
	'legless_legolas',
	'StriderTheRider96',
	'GROND',
	'gollum_wuz_here',
	'secondbreakfast4lyfe',
	'boromeerkat',
	'obi-wonton',
	'MasterYodaTripped',
	'Tech_Savvy_Darth',
	'wanna_buy_some_droids',
	'N0wTh1s1sP0dr4c1ng',
	'chewie_4_president',
];

// 20 random english words
const randWords = [
	'abruptly',
	'absurd',
	'abyss',
	'affix',
	'askew',
	'avenue',
	'awkward',
	'axiom',
	'azure',
	'bagpipes',
	'bandwagon',
	'banjo',
	'bayou',
	'beekeeper',
	'bikini',
	'blitz',
	'blizzard',
	'boggle',
	'bookworm',
	'boxcar',
	'boxful',
	'buckaroo',
	'buffalo',
	'buffoon',
	'buxom',
	'buzzard',
	'buzzing',
	'buzzwords',
	'caliph',
	'cobweb',
	'cockiness',
	'croquet',
	'crypt',
	'curacao',
	'cycle',
	'daiquiri',
	'dirndl',
	'disavow',
	'dizzying',
	'duplex',
	'dwarves',
	'embezzle',
	'equip',
	'espionage',
	'euouae',
	'exodus',
	'faking',
	'fishhook',
	'fixable',
	'fjord',
	'flapjack',
	'flopping',
	'fluffiness',
	'flyby',
	'foxglove',
	'frazzled',
	'frizzled',
	'fuchsia',
	'funny',
	'gabby',
	'galaxy'
];

const thoughts = [
	'You know, I\'ve been thinking... maybe it\'s the Jedi who are crazy. I mean, they created the clones. They\'re the ones who\'ve been lying to us all this time. They\'re the ones who\'ve been keeping us in the dark. They\'re the ones who\'ve been manipulating us. They\'re the ones who\'ve been using us. They\'re the ones who\'ve been controlling us.',
	'All we have to decide is what to do with the time that is given to us.',
	'You can\'t win, Darth. If you strike me down, I shall become more powerful than you can possibly imagine.',
	'You\'re all clear, kid. Now let\'s blow this thing and go home!',
	'Have you ever heard the tragedy of Darth Plagueis the Wise? I thought not. It\'s not a story the Jedi would tell you. It\'s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.',
	'Mos Eisley spaceport. You will never find a more wretched hive of scum and villainy. We must be cautious.',
	'Hobbits are a queer folk. They don\'t like to be late, but they don\'t like to be early either. They\'re always late for dinner, but they always leave early.',
	'Dwarves give the impression of being simple, but they are not. They are a subtle folk. They are not easily offended, but they remember a slight.',
	'Gandalf wouldn\'t have come if he didn\'t think it was important. He\'s not the kind of wizard to just drop in for a visit.',
	'You can\'t trust anyone these days. Not even yourself.',
	'The dwarves dug too greedily and too deep. Now we must suffer for it.',
	'The Shire is my home. I love it, and I\'m going to miss it. But I don\'t want to stay here. I want to see the world. I want to see other places, and learn other things. I want to be a part of something bigger than me.',
	'I don\'t know half of you half as well as I should like; and I like less than half of you half as well as you deserve.',
	'I don\'t think he knows about second breakfast, Pip.',
	'Minas Tirith is a city of stone and steel. It is a fortress that has stood for a thousand years. It cannot be taken by storm. It can only be taken by treachery.',
	'Gondor calls for aid! Here is the hour of our greatest need! The armies of Mordor are upon us! The enemy is at the gate!',
	'You are a bold one, my friend. But you cannot hide from me forever.',
	'General Grievous. You are shorter than I expected.',
	'You are a part of the Rebel Alliance and a traitor! Take her away!',
	'You\'re a droid. You\'re supposed to be more reliable than this.',
	'Governor Tarkin, I should\'ve expected to find you holding Vader\'s leash. I recognized your foul stench when I was brought on board.'
];

const reactions = [
	'Love it!',
	'Great post!',
	'Agreed!',
	'You\'ve changed my mind.',
	'Disliked.',
	'Disagree.',
	'Not a fan.',
	'Makes me sad.',
	'You\'re a genius!',
	'You\'re a moron!',
	'You\'re a fool!',
	'You\'re rebel scum!',
];

// function to get random item from array
const getRandomItem = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
}

const randomSort = (arr) => {
	return arr.sort(() => Math.random() - 0.5);
}

module.exports = {
	usernames,
	randWords,
	thoughts,
	reactions,
	getRandomItem,
	randomSort
};

