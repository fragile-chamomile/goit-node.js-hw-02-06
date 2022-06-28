const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");

const signUp = async (req, res) => {
	const { email, password, subscription } = req.body;
	const result = await User.findOne({ email });
	if (result) {
		throw new Conflict(`User with this email=${email} already registered`);
	}

	const avatarURL = gravatar.url(email);
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const user = await User.create({
		email,
		password: hashPassword,
		subscription,
		avatarURL,
	});

	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			user: {
				email,
				subscription,
				avatarURL,
			},
			message: "Registration successful",
		},
	});
};

module.exports = signUp;
