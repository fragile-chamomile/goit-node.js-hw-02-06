const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
	"/:id/favorite",
	validation(favoriteJoiSchema),
	ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
