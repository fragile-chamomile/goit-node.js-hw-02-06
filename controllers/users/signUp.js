const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../../models/user");

const signUp = async (req, res) => {
	const { email, password, subscription } = req.body;
	const result = await User.findOne({ email });
	if (result) {
		throw new Conflict(`User with this email=${email} already registered`);
	}
	const verificationToken = v4();
	const avatarURL = gravatar.url(email);
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	await User.create({
		email,
		password: hashPassword,
		subscription,
		avatarURL,
		verificationToken,
	});

	const msg = {
		to: email,
		from: "vall.bell91@gmail.com",
		subject: "Confirm Your Email",
		html: `<p>By clicking on the following link, you are confirming your email address.</p>
					<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});

	res.status(201).json({
		status: "success",
		code: 201,
		message: "Registration successful",
		data: {
			user: {
				email,
				subscription,
				avatarURL,
				verificationToken,
			},
		},
	});
};

module.exports = signUp;
