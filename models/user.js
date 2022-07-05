const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSignUpSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
		.required(),
	subscription: Joi.string(),
});

const joiLogInSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
		.required(),
});

const joiReVerificationSchema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
		.required(),
});

module.exports = {
	User,
	joiSignUpSchema,
	joiLogInSchema,
	joiReVerificationSchema,
};
