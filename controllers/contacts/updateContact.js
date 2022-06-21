const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!id) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	res.json({
		status: "success",
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = updateContact;
