const express = require("express");
const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
const { joiSignUpSchema, joiLogInSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(joiLogInSchema), ctrlWrapper(ctrl.logIn));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

router.get("/logout", auth, ctrlWrapper(ctrl.logOut));

router.patch(
	"/avatars",
	auth,
	upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar)
);

router.delete("/avatars", auth, ctrlWrapper(ctrl.removeAvatar));

module.exports = router;
