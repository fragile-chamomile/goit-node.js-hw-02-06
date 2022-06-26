const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailCheck =
	/^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			match: emailCheck,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSignUpSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	subscription: Joi.string(),
});

const joiLogInSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
});

module.exports = { User, joiSignUpSchema, joiLogInSchema };
