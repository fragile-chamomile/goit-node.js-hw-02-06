const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const signUp = async (req, res) => {
	const { email, password, subscription } = req.body;
	const result = await User.findOne({ email });
	if (result) {
		throw new Conflict(`User with this email=${email} already registered`);
	}

	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const user = await User.create({
		email,
		password: hashPassword,
		subscription,
	});
	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			user: {
				email,
				subscription,
			},
			message: "Registration successful",
		},
	});
};

module.exports = signUp;
