const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSignUpSchema, joiLogInSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

router.post("/login", validation(joiLogInSchema), ctrlWrapper(ctrl.logIn));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logOut));

module.exports = router;
