const { User } = require("../../models/user");
const fs = require("fs/promises");
const gravatar = require("gravatar");

const removeAvatar = async (req, res) => {
	const { _id, email, avatarURL } = req.user;
	const user = await User.findById(_id);
	fs.unlink(avatarURL);
	const newURL = gravatar.url(email);
	user.avatarURL = newURL;
	await user.save();
	res.json({
		status: "success",
		code: 200,
		message: `Avatar deleted`,
		data: {
			user: {
				email,
				avatarURL,
			},
		},
	});
};

module.exports = removeAvatar;
