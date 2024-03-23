const bcrypt = require("bcrypt");

const users = [
	{ id: 1, username: "user1", password: bcrypt.hashSync("password1", 10) },
	{ id: 1, username: "bsaleh", password: bcrypt.hashSync("password2", 10) },
	{ id: 1, username: "jemery", password: bcrypt.hashSync("password3", 10) },
];

module.exports = users;
