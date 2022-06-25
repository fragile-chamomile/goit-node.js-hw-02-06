const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
	const { email, password, subscription } = req.body;
	const user = await User.findOne({ email });
	const passCompare = bcrypt.compareSync(password, user.password);
	if (!user || !passCompare) {
		throw new Unauthorized(`Email or password is wrong`);
	}
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		status: "success",
		code: 200,
		data: {
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		},
	});
};

module.exports = logIn;
