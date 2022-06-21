const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
	const { id } = req.params;
	const deleteContact = await Contact.findByIdAndRemove(id);
	if (!deleteContact) {
		throw new NotFound(`Product with id=${id} not found`);
	}
	res.json({
		status: "success",
		code: 200,
		message: `Contact with id=${id} deleted`,
		data: {
			deleteContact,
		},
	});
};

module.exports = removeContact;
