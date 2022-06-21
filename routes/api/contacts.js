const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
	"/:id/favorite",
	validation(),
	ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
