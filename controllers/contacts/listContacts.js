const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
	const { _id } = req.user;
	const { page = 1, limit = 20 } = req.param;
	const skip = (page - 1) * limit;
	const contacts = await Contact.find({ owner: _id }, "", {
		skip,
		limit: Number(limit),
	}).populate("owner", "_id email subscription");
	res.json({
		status: "success",
		code: 200,
		data: {
			contacts,
		},
	});
};

module.exports = listContacts;
