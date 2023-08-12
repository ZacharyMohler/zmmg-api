const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//method to register new user
const register = (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({ "message": "All fields required" });
	}

	const user = new User();
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save((err) => {
		if (err) {
			res
				.status(404)
				.json(err);
		}
		else {
			const token = user.generateJwt();
			res
				.status(200)
				.json({ token });
		}
	});
};

//method to log a user in
const login = (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({ "message": "All fields required" });
	}
	passport.authenticate('local', (err, user, info) => {
		let token;
		if (err) {
			return res
				.status(404)
				.json(err);
		}
		if (user) {
			token = user.generateJwt();
			res
				.status(200)
				.json({ token });
		}
		else {
			res
				.status(401)
				.json(info);
		}
	})(req, res);
};

module.exports = {
	register,
	login
};