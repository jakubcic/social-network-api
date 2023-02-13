// helper function to obfuscate email addresses, this will be a getter in the User model
function obfuscate(email) {
	// find position of @ symbol
	const separatorIndex = email.indexOf('@');
	// if @ symbol is in the first 3 characters, obfuscate all characters up to the @ symbol
	if (separatorIndex < 3) {
		// 'ab@email.com' -> '**@email.com'
		return email.slice(0, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
	}
	// otherwise, obfuscate all characters between the first 2 and the @ symbol
	// 'test123@email.com' -> 'te*****@email.com'
	return email.slice(0, 2) + email.slice(2, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
}
