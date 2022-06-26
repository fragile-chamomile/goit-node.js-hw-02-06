const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	if (subscription === undefined) {
		throw new BadRequest(`Missing field subscription`);
	}
	const result = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);
	if (!result) {
		throw new NotFound(`User with id=${id} not found`);
	}
	res.json({
		status: "success",
		code: 200,
		data: {
			result: {
				_id,
				email: req.user.email,
				subscription,
			},
		},
	});
};

module.exports = updateSubscription;
