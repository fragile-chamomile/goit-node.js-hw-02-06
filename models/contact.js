const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	phone: Joi.string().required(),
	favorite: Joi.bool().valid(true, false),
});

const favoriteJoiSchema = Joi.object({
	favorite: Joi.bool().valid(true, false).required(),
});

module.exports = { Contact, joiSchema, favoriteJoiSchema };
