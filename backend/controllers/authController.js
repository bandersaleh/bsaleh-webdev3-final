const jwt = require("jsonwebtoken");
const users = require("../models/user");
const bcrypt = require("bcrypt");

const loginUser = (req, res) => {
	// console.log(req.body);
	// res.send(req.body);
	const { username, password } = req.body;

	// console.log(username);
	// console.log(password);
	const user = users.find((u) => u.username === username);

	if (user) {
		const match = bcrypt.compareSync(password, user.password);
		if (match) {
			const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
				expiresIn: "1hr",
			});
			res.json({ token });
		} else {
			res.status(401).send("Username or password not correct");
		}
	} else {
		res.status(401).send("Username or password not correct");
	}
};

const getUserInfo = (req, res) => {
	const userId = req.user.userId;
	const user = users.find((u) => u.id === userId);
	res.json(user);
};

//middleware
const verifyToken = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		return res.status(403).send("Token Required");
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = { loginUser, verifyToken, getUserInfo };
