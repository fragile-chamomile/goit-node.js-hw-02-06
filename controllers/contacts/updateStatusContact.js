const { Contact } = require("../../models/contact");
const { NotFound, BadRequest } = require("http-errors");

const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const { favorite } = req.body;
	if (favorite === undefined) {
		throw new BadRequest(`Missing field favorite`);
	}
	const result = await Contact.findByIdAndUpdate(
		id,
		{ favorite },
		{ new: true }
	);
	if (!result) {
		throw new NotFound(`Contact with id=${id} not found`);
	}
	res.json({
		status: "success",
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = updateStatusContact;
