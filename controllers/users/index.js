const signUp = require("./signUp");
const logIn = require("./logIn");
const logOut = require("./logOut");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const removeAvatar = require("./removeAvatar");
const verifyEmail = require("./verifyEmail");
const reVerification = require("./reVerification");

module.exports = {
	signUp,
	logIn,
	logOut,
	getCurrent,
	updateSubscription,
	updateAvatar,
	removeAvatar,
	verifyEmail,
	reVerification,
};
